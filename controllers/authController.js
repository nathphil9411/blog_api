const User = require("./../models/userModel");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");

const signUp = catchAsync(async (req, res, next) => {
	const newUser = await User.create({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
	});
	const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

	res.status(201).json({
		status: "success",
		token,
		data: { message: "Create post with the token" },
	});
});

const signIn = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(new AppError("Input an email or password", 400));
	}
	email.toLowerCase().trim();
	const user = await User.findOne({ email: email }).select("+password");
	if (!user) {
		return next(new AppError("Invalid email", 401));
	}
	const match = await bcrypt.compare(password, user.password);
	if (match && email === user.email) {
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN,
		});
		res.cookie("token", token, {
			path: "/",
			secure: true,
			httpOnly: true,
			sameSite: "None",
		});
		res.status(200).json({
			status: "success",

			data: { token: token },
		});
	} else {
		return next(new AppError("wrong password", 401));
	}
});
const signOut = (req, res) => {
	res.clearCookie("token");
	res.status(200).json({
		status: "success",
		message: "Successfully signed out",
	});
};

module.exports = { signUp, signIn, signOut };
