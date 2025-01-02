const express = require("express");

const { isAuthenticatedUser, demoRestrictionMiddleware } = require("../middlewares/auth");
const { toggleBlogSave, checkBlogSave, mySavedBlogs } = require("../controller/blogSaveController");

const router = express.Router();

router.route("/:blogId/save-unsave").post(isAuthenticatedUser, demoRestrictionMiddleware, toggleBlogSave);
router.route("/:blogId/save-status").get(isAuthenticatedUser, checkBlogSave);
router.route("/saved-blogs-summary").get(isAuthenticatedUser, mySavedBlogs);

module.exports = router;