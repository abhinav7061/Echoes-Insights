const { sendErrorResponse } = require("../lib/responseHelper");
const User = require("../models/userSchema");
const Blog = require("../models/blogSchema");
const Comment = require('../models/commentSchema');

exports.createComment = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const userId = req.user._id;
        const { comment } = req.body;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return sendErrorResponse(res, 404, "Blog not found")
        }
        // Check if the user has already commented on the blog
        const existingComment = await Comment.findOne({ blogId, commentedBy: userId });

        if (existingComment) {
            // Update the existing comment
            existingComment.comment = comment;
            await existingComment.save();
            res.status(200).json({ success: true, message: 'Comment updated', updatedComment: existingComment });
        } else {
            // Create a new comment
            const newComment = new Comment({
                comment,
                blogId,
                commentedBy: userId
            });

            // Save the new comment to the database
            await newComment.save();

            res.status(200).json({ success: true, message: 'Comment added', newComment });
        }
    } catch (error) {
        sendErrorResponse(res, 500, error.message)
    }
}

exports.deleteComment = async (req, res) => {
    const commentId = req.params.id;
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return sendErrorResponse(res, 404, "Comment not found");
        }

        res.status(200).json({ success: true, message: 'Comment Deleted' });
    } catch (err) {
        console.log(err.message);
        sendErrorResponse(res, 500, "Server Error")
    }
};

exports.commentCount = async (req, res) => {
    const blogId = req.params.blogId;

    try {
        // Count the number of comments for the specified blog ID
        const count = await Comment.countDocuments({ blogId });
        res.status(200).json({ success: true, count });
    } catch (error) {
        return sendErrorResponse(res, 500, error.message);
    }
}

// Get all comments from a specific blog
exports.getAllComments = async (req, res) => {
    const { blogId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    try {
        const skip = (page - 1) * limit;

        // Query comments for the specified blog ID with pagination
        const comments = await Comment.find({ blogId })
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1 }); // Sort comments by creation date in descending order

        res.status(200).json({ success: true, comments });
    } catch (error) {
        console.error('Error while fetching comments:', error);
        return sendErrorResponse(res, 500, error.message);
    }
}