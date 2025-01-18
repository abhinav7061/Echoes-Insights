const express = require("express")
const { createComment, deleteComment, getAllComments, editComment } = require("../controller/commentController");
const { isAuthenticatedUser, demoRestrictionMiddleware } = require("../middlewares/auth");

const router = express.Router()

router.route("/add/:blogId").post(isAuthenticatedUser, demoRestrictionMiddleware, createComment);
router.route("/update/:id").patch(isAuthenticatedUser, demoRestrictionMiddleware, editComment);
router.route("/delete/:id").delete(isAuthenticatedUser, demoRestrictionMiddleware, deleteComment);
router.route("/all-comment/:blogId").get(getAllComments);

module.exports = router