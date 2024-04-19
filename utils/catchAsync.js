//This module wraps all async function that uses try and catch.
module.exports = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) => next(err));
	};
};
