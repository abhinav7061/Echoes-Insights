const express = require("express");
const { isAuthenticatedUser, demoRestrictionMiddleware } = require("../middlewares/auth");
const { toggleFollow, checkFollowing, getFollowers, getFollowings } = require("../controller/followerController");

const router = express.Router();

router.route('/:authorId/follow-unfollow').post(isAuthenticatedUser, demoRestrictionMiddleware, toggleFollow);
router.route('/:authorId/follow-status').get(isAuthenticatedUser, checkFollowing);
router.route('/followers/:id').get(isAuthenticatedUser, getFollowers);
router.route('/followings/:id').get(isAuthenticatedUser, getFollowings);

module.exports = router;