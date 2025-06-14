const express = require("express");
const { getAllBlogSummaries, getBlog, createBlog, editBlog, isBlogWriter, deleteBlog, getShorts } = require("../controller/blogController")
const { isAuthenticatedUser, isBlogAuthor, permit, isOwnerOrAdmin } = require("../middlewares/auth");
const multerMiddleware = require("../middlewares/multer");
const router = express.Router();

router.route("/allBlogSummaries").get(getAllBlogSummaries);
router.route("/shorts").get(getShorts);
router.route("/createBlog").post(isAuthenticatedUser, permit('admin', 'writer'), multerMiddleware('cover'), createBlog);
router.route("/isAuthor/:blogId").post(isAuthenticatedUser, isBlogAuthor, isBlogWriter);
router.route("/editBlog/:blogId").put(isAuthenticatedUser, permit('admin', 'writer'), isOwnerOrAdmin, multerMiddleware('cover'), editBlog);
router.route("/deleteBlog/:blogId").delete(isAuthenticatedUser, permit('admin', 'writer'), isOwnerOrAdmin, deleteBlog);
router.route("/getBlog/:id").get(getBlog);

module.exports = router;
