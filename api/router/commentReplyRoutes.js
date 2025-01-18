const express = require("express")
const { createCommentReply, editCommentReply, deleteCommentReply, getAllCommentReplies } = require("../controller/commentReplyController");
const { isAuthenticatedUser, demoRestrictionMiddleware } = require("../middlewares/auth");

const router = express.Router()

router.route("/add/:commentId").post(isAuthenticatedUser, demoRestrictionMiddleware, createCommentReply);
router.route("/update/:id").patch(isAuthenticatedUser, demoRestrictionMiddleware, editCommentReply);
router.route("/delete/:id").delete(isAuthenticatedUser, demoRestrictionMiddleware, deleteCommentReply);
router.route("/all-reply/:commentId").get(getAllCommentReplies);

module.exports = router