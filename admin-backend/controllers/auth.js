const { sendEmailWithRetry } = require("../utils/emailQueue");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const logger = require("../utils/logger");

async function signup(req, res) {
  const { email, password, phone } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, phone },
    });

    const token = jwt.sign({ userId: user?.id }, process.env.JWT_SECRET);

    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_USER}>`,
      to: user?.email,
      subject: "Welcome To Fresh Home",
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
              
              <img src="https://static.vecteezy.com/system/resources/thumbnails/008/075/444/small/the-logo-of-home-housing-residents-real-estate-with-a-concept-that-presents-rural-nature-with-a-touch-of-leaves-and-sunflowers-vector.jpg" 
                   alt="Your App Logo" 
                   style="width: 100px; display: block; margin: 0 auto 20px;" />

              <h1 style="color: #16a34a; text-align: center;">Welcome!</h1>

              <p style="font-size: 16px;">
                Hey there, Welcome to Fresh to Home. If you have any questions about our app, 
                you can always reach out to us.
              </p>

              <div style="text-align: center; margin: 20px 0;">
                <a href="https://yourapp.com"
                   style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                   Visit Our Website
                </a>
              </div>

              <p style="font-size: 12px; color: #666; text-align: center;">
                Reply to this message or open it in Your App.
              </p>

              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

              <p style="font-size: 12px; color: #666; text-align: center;">
                If you no longer wish to receive these emails,
                <a href="https://yourapp.com/unsubscribe?email=${user?.email}"
                   style="color: #2563eb;">
                   unsubscribe here
                </a>.
              </p>

            </div>
        `,
    };

    sendEmailWithRetry(mailOptions).catch((error) =>
      logger.error(`Failed to send welcome email after retries`, error),
    );
    res.json({ user, token });
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.json({ user, token });
  } catch (error) {
    logger.error(error);
    throw error;
  }
}


module.exports = {signup, login}