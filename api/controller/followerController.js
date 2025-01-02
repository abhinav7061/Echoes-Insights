const User = require("../models/userSchema");
const Follower = require('../models/follower')
const { sendErrorResponse, sendSuccessResponse } = require('../lib/responseHelper');

exports.toggleFollow = async (req, res) => {
  try {
    const userId = req.user._id;
    const { authorId } = req.params;
    if (userId.toString() === authorId.toString()) return sendErrorResponse(res, 404, 'You can not follow yourself');
    const author = await User.findById(authorId);
    if (!author) return sendErrorResponse(res, 404, 'User not found');

    const follow = await Follower.findOne({ followerId: userId, followingId: authorId });

    if (follow) {
      await Follower.deleteOne({ _id: follow._id });
      return sendSuccessResponse(res, 200, 'Successfully unfollowed the author', { followed: false });
    } else {
      const newFollow = new Follower({ followerId: userId, followingId: authorId });
      await newFollow.save();
      return sendSuccessResponse(res, 201, 'Successfully followed the author', { followed: true });
    }
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, error.message);
  }
};
exports.checkFollowing = async (req, res) => {
  try {
    const userId = req.user._id;
    const { authorId } = req.params;
    const follow = await Follower.findOne({ followerId: userId, followingId: authorId });

    return sendSuccessResponse(res, 200, null, { followed: !!follow });
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, error.message);
  }
};

exports.getFollowers = async (req, res) => {
  const userId = req.params.id;
  const { page = 1, pageSize = 5 } = req.query;
  try {
    let query = { followingId: userId };

    // Find the total count of followers 
    const totalFollowers = await Follower.countDocuments(query);

    // Calculate skip and limit for pagination
    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    // Fetch followers with pagination and sorting
    const followers = await Follower.find(query)
      .select('followerId createdAt')
      .populate('followerId', 'name')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    // Return followers and pagination metadata
    res.status(200).json({
      totalFollowers,
      followers: followers.map(f => ({ _id: f.followerId._id, name: f.followerId.name, createdAt: f.createdAt })),
      success: true
    });
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal server error');
  }
};


exports.getFollowings = async (req, res) => {
  const userId = req.params.id;
  const { page = 1, pageSize = 5 } = req.query;

  try {
    let query = { followerId: userId };

    // Find the total count of followings
    const totalFollowings = await Follower.countDocuments(query);

    // Calculate skip and limit for pagination
    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    // Fetch followers with pagination and sorting
    const followings = await Follower.find(query)
      .select('followingId createdAt')
      .populate('followingId', 'name')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    // Return followers and pagination metadata
    res.status(200).json({
      totalFollowings,
      followings: followings.map(f => ({ _id: f.followingId._id, name: f.followingId.name, createdAt: f.createdAt })),
      success: true
    });
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal server error');
  }
}