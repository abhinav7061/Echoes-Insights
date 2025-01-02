const express = require("express");
const { registerUser, loginUser, isUserLoggedIn, logoutUser, forgotPassword } = require("../controller/userController");
const { isAuthenticatedUser } = require("../middlewares/auth")
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticatedUser, logoutUser);
router.route("/forgot-password").put(forgotPassword);
router.route("/isAuthenticatedUser").get(isAuthenticatedUser, isUserLoggedIn);

module.exports = router;