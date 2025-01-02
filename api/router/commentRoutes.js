const express = require("express")
const { createComment, deleteComment, commentCount, getAllComments } = require("../controller/commentController");
const { isAuthenticatedUser, demoRestrictionMiddleware } = require("../middlewares/auth");

const router = express.Router()

router.route("/postComment/:blogId").put(isAuthenticatedUser, demoRestrictionMiddleware, createComment);
router.route("/deleteComment/:id").delete(isAuthenticatedUser, demoRestrictionMiddleware, deleteComment);
router.route("/commentCount/:blogId").get(commentCount);
router.route("/getComments/:blogId").get(getAllComments);



module.exports = router