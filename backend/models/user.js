const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// Define schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  status: { type: String, default: "active" },
  date: { type: Date, default: Date.now },
});

// JWT generator
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWTPRIVATEKEY,
    { expiresIn: "7d" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

// Joi validation
const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    role: Joi.string().valid("user", "admin").optional().label("Role"),
    secretKey: Joi.string().optional().label("Admin Secret Key"),
  });

  const { error, value } = schema.validate(data);
  if (error) return { error };

  // Additional check: only if admin role selected
  if (value.role === "admin") {
    const ADMIN_KEY = process.env.ADMIN_SECRET_KEY || "AdminKey@1234";
    if (value.secretKey !== ADMIN_KEY) {
      return {
        error: { details: [{ message: "Invalid admin secret key" }] },
      };
    }
  }

  return { value };
};

module.exports = { User, validate };
