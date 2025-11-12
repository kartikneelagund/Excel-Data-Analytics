const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

// Define Admin Secret Key (from .env or fallback)
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "AdminKey@1234";

router.post("/", async (req, res) => {
  try {
    // Validate input using Joi or your model validation
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res
        .status(409)
        .send({ message: "User with given email already exists!" });

    // Admin secret key validation
    if (req.body.role === "admin") {
      if (req.body.secretKey !== ADMIN_SECRET_KEY) {
        return res.status(400).send({ message: "Invalid Admin Secret Key" });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(Number(process.env.SALT) || 10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashPassword,
      role: req.body.role || "user", // default is user
    });

    await newUser.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
