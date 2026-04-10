const validate = require("../middlewares/validation");
const express = require("express");
const { signup, login } = require("../controllers/auth");
const z = require("zod");

const router = express.Router();

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

const googleSchema = z.object({
  idToken: z.string()
});


router.post("/signup",validate(signUpSchema),signup);
router.post("/lgin",validate(loginSchema),login);


module.exports =  router;







