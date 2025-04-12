const express = require("express");
const { getAllBlogSummaries, getBlog, createBlog, editBlog, isBlogWriter, deleteBlog, getShorts } = require("../controller/blogController")
const { isAuthenticatedUser, isBlogAuthor } = require("../middlewares/auth")
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router.route("/allBlogSummaries").get(getAllBlogSummaries);
router.route("/shorts").get(getShorts);
router.route("/createBlog").post(isAuthenticatedUser, upload.single('cover'), createBlog);
router.route("/isAuthor/:blogId").post(isAuthenticatedUser, isBlogAuthor, isBlogWriter);
router.route("/editBlog/:blogId").put(isAuthenticatedUser, isBlogAuthor, upload.single('cover'), editBlog);
router.route("/deleteBlog/:blogId").delete(isAuthenticatedUser, isBlogAuthor, deleteBlog);
router.route("/getBlog/:id").get(getBlog);

module.exports = router;
