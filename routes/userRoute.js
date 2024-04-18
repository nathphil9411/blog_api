const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

//Creates a new user
router.post("/signup", authController.signUp);

//Signs in an existing user
router.post("/signin", authController.signIn);

module.exports = router;
