const { promisify } = require("util");
const Jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

const authMiddleware = catchAsync(async (req, res, next) => {
	// console.log("Auth middleware");
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
		console.log(token);
	}
	if (!token) {
		return next(new appError("Login to access this page", 401));
	}

	const decoded = await promisify(Jwt.verify)(token, process.env.JWT_SECRET);

	console.log("Decoded", decoded);

	/* console.log("Token", bearerToken[1]);

		req.user = decoded;
		next();
	}); */
	const freshUser = User.findById(decoded.id);
	if (!freshUser) {
		return next(new appError("User not found", 401));
	}
	next();
});

module.exports = authMiddleware;
