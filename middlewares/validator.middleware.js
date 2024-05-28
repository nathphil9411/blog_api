const { body, validationResult } = require("express-validator");

const signupRules = () => {
	return [
		body("first_name").isString().withMessage("first name must be a string"),
		body("last_name").isString().withMessage("last name must be a string"),
		body("email").isEmail().withMessage("email must be a valid email"),
		body("password").isString().withMessage("password must be a string"),
		body("confirmPassword")
			.isString()
			.withMessage("confirm password must be a string"),
	];
};
const signinRules = () => {
	return [
		body("email").isEmail().withMessage("Provide a valid email address"),
		body("password").isString().withMessage("Password must be string"),
	];
};

// Validation rules for creating a new article
const createNewArticleRules = () => {
	return [
		body("title").isString().withMessage("Title must be a string"),
		body("description")
			.isOptional()
			.isString()
			.withMessage("Description must be a string"),
		body("state")
			.isOptional()
			.isIn(["draft", "published"])
			.withMessage("State must be either 'draft' or 'published'"),
		body("body").isString().withMessage("Body must be a string"),
		body("tags")
			.isOptional()
			.isArray()
			.withMessage("Tags must be an array of strings")
			.custom((tags) => tags.every((tag) => typeof tag === "string"))
			.withMessage("Each tag must be a string"),
	];
};

// Validation rules for updating an article
const updateArticleRules = () => {
	return [
		body("title").isOptional().isString().withMessage("Title must be a string"),
		body("description")
			.isOptional()
			.isString()
			.withMessage("Description must be a string"),
		body("state")
			.isOptional()
			.isIn(["draft", "published"])
			.withMessage("State must be either 'draft' or 'published'"),
		body("body").isOptional().isString().withMessage("Body must be a string"),
		body("tags")
			.isOptional()
			.isArray()
			.withMessage("Tags must be an array of strings")
			.custom((tags) => tags.every((tag) => typeof tag === "string"))
			.withMessage("Each tag must be a string"),
	];
};

// Validation rule for updating article state
const updateArticleStateRule = () => {
	return [
		body("state")
			.isIn(["draft", "published"])
			.withMessage("State must be either 'draft' or 'published'"),
	];
};

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	const extractedErrors = [];
	errors.array().map((error) => {
		extractedErrors.push({ [error.param]: error.msg });
	});
	return res.status(422).json({
		errors: extractedErrors,
	});
};

module.exports = {
	validate,
	signupRules,
	signinRules,
	createNewArticleRules,
	updateArticleRules,
	updateArticleStateRule,
};
