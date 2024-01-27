const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/login", authController.getLoginPage);

router.get("/signup", authController.getSignUpPage);

router.post("/login", authController.createLoginData);

router.post("/signup", authController.createNewAccount);

router.post("/logout", authController.logout);

module.exports = router;
