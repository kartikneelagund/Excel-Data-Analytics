const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// Define the schema
const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, enum: ["user", "admin"], default: "user" }, // Added role
	status: { type: String, default: "active" },
	date: { type: Date, default: Date.now },
});

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, role: this.role },
		process.env.JWTPRIVATEKEY,
		{ expiresIn: "7d" }
	);
	return token;
};

const User = mongoose.model("User", userSchema);

// Joi validation schema
const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		role: Joi.string().valid("user", "admin").required().label("Role"),
		secretKey: Joi.when("role", {
			is: "admin",
			then: Joi.string()
				.required()
				.valid(process.env.ADMIN_SECRET_KEY)
				.label("Admin Secret Key"),
			otherwise: Joi.forbidden(), // if role is 'user', this field is ignored
		}),
	});

	return schema.validate(data);
};

module.exports = { User, validate };
