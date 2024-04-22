const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");

//Creates a new user
router.post("/signup", authController.signUp);

//Signs in an existing user
router.post("/signin", authController.signIn);

//Signout a user
router.post("/signout", authController.signOut);

module.exports = router;
