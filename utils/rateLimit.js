const expressRateLimit = require("express-rate-limit");

const limiter = expressRateLimit({
	windowMs: 1 * 60 * 1000,
	max: 60,
	message: "You have exceeded request per minutes",
});

module.exports = limiter;
