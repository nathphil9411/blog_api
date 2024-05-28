const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
const {
	signupRules,
	validate,
	signinRules,
} = require("../middlewares/validator.middleware");
//Creates a new user
router.post("/signup", signupRules(), validate, authController.signUp);

//Signs in an existing user
router.post("/signin", signinRules(), validate, authController.signIn);

//Signout a user
router.post("/signout", authController.signOut);

module.exports = router;
