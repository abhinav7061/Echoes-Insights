const express = require("express");
const { registerUser, loginUser, isUserLoggedIn, logoutUser, forgotPassword, profilePicture, updateProfile } = require("../controller/userController");
const { isAuthenticatedUser } = require("../middlewares/auth")
const multerMiddleware = require("../middlewares/multer");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/profile-picture").post(isAuthenticatedUser, multerMiddleware('avatar'), profilePicture);
router.route("/update-profile").patch(isAuthenticatedUser, updateProfile);
router.route("/login").post(loginUser);
router.route("/logout").post(isAuthenticatedUser, logoutUser);
router.route("/forgot-password").put(forgotPassword);
router.route("/isAuthenticatedUser").get(isAuthenticatedUser, isUserLoggedIn);

module.exports = router;