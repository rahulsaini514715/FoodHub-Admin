const nodemailer = require("nodemailer");

const logger = require("./logger");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sksaini514715@gmail.com",
    pass: "dywztiiaeryptxsa",
  },
});

transporter.verify((error, success) => {
  if (error) {
    logger.error("Email transporter error", error);
  } else {
    logger.info("Email transporter is ready!");
  }
});

async function sendEmailWithRetry(mailOptions, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await transporter.sendMail(mailOptions);
      logger.info(`Email sent: ${mailOptions.subject}`);
      return;
    } catch (error) {
      logger.error(`Email attempt ${attempt} failed: ${error}`);

      if (attempt === maxRetries) {
        throw error;
      }
    }
  }
}

module.exports = { sendEmailWithRetry, transporter };
