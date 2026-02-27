
const logger = require("./utils/logger");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const crypto = require("crypto");

const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products") ;
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests",
  })
);

// app.use(cors({ origin: "http://localhost:3000" }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.1.36:3001/",
    ],
  })
);


app.use(express.json());
app.use(bodyParser.raw({ type: "application/json" }));

//route wit API VERSIONING 
app.use("/api/v1/categories",categoryRoutes);
app.use("/api/v1/products",productRoutes)

app.use(errorHandler)
// console.log("DATABASE:", process.env.DATABASE_URL);

app.listen(3001, () => logger.info("Server running on http://localhost:3001"));





