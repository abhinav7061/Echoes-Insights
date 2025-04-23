const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, demoRestrictionMiddleware } = require('../middlewares/auth');

const {
    toggleBlogLike,
    toggleCommentLike,
    toggleCommentReplyLike,
    checkBlogLike,
    checkCommentLike,
    checkCommentReplyLike,
    getLikedBlogs
} = require('../controller/likeController');

router.route('/blog').get(isAuthenticatedUser, getLikedBlogs);

router.route('/blog/:blogId/like-dislike').post(isAuthenticatedUser, demoRestrictionMiddleware, toggleBlogLike);
router.route('/comment/:commentId/like-dislike').post(isAuthenticatedUser, demoRestrictionMiddleware, toggleCommentLike);
router.route('/comment-reply/:commentReplyId/like-dislike').post(isAuthenticatedUser, demoRestrictionMiddleware, toggleCommentReplyLike);

router.route('/blog/:blogId/like-status').get(isAuthenticatedUser, checkBlogLike);
router.route('/comment/:commentId/like-status').get(isAuthenticatedUser, checkCommentLike);
router.route('/comment-reply/:commentReplyId/like-status').get(isAuthenticatedUser, checkCommentReplyLike);

module.exports = router;
