const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: [true, "firstname is required"],
		trim: true,
	},
	last_name: {
		type: String,
		required: [true, "Lastname is required"],
		trim: true,
	},
	email: {
		type: String,
		required: [true, "email is required"],
		unique: true,
		trim: true,
		lowercase: true,
		validate: [validator.isEmail, "Provide a valid Email"],
	},
	password: {
		type: String,
		required: [true, "password is required"],
		select: false,
	},
	confirmPassword: {
		type: String,
		required: [true, "confirm the password"],
		trim: true,
		validate: {
			validator: function (el) {
				return this.password === el;
			},
		},
	},
});
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 12);
	this.confirmPassword = undefined;
	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
