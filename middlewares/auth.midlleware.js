const { promisify } = require("util");
const Jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

const authMiddleware = catchAsync(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}
	if (!token) {
		return next(new appError("Login to access this page", 401));
	}
	const decoded = await promisify(Jwt.verify)(token, process.env.JWT_SECRET);
	const freshUser = await User.findById(decoded.id);
	if (!freshUser) {
		return next(new appError("User not found", 401));
	}
	req.user = freshUser;
	next();
});

module.exports = authMiddleware;
