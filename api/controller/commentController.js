const { sendErrorResponse, sendSuccessResponse } = require("../lib/responseHelper");
const User = require("../models/userSchema");
const Blog = require("../models/blogSchema");
const Comment = require('../models/commentSchema');
const CommentReply = require("../models/commentReplySchema");

exports.createComment = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const user = req.user;
        const userId = user._id;
        const { comment } = req.body;
        if (!comment.trim()) return sendErrorResponse(res, 400, 'comment is required');
        const blog = await Blog.findByIdAndUpdate(blogId, { $inc: { commentsCount: 1 } }, { new: true });
        if (!comment) return sendErrorResponse(res, 404, "Comment not found");
        if (!blog) return sendErrorResponse(res, 404, "Blog not found")
        const newComment = new Comment({
            comment,
            blogId,
            userId
        });
        await newComment.save();
        const transformedComment = {
            ...newComment.toObject(),
            user: {
                _id: user._id,
                name: user.name,
                avatar: user?.avatar
            },
        };
        delete transformedComment.userId;

        return sendSuccessResponse(res, 200, 'Comment added', { newComment: transformedComment, commentsCount: blog.commentsCount })
    } catch (error) {
        sendErrorResponse(res, 500, error.message)
    }
}

exports.editComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const { comment } = req.body;
        if (!comment.trim()) return sendErrorResponse(res, 400, 'comment is required');
        const existingComment = await Comment.findById(commentId);
        if (!existingComment) return sendErrorResponse(res, 404, "You have no comment")

        existingComment.comment = comment;
        await existingComment.save();
        return sendSuccessResponse(res, 200, 'Comment updated', { updatedComment: existingComment });
    } catch (error) {
        sendErrorResponse(res, 500, error.message)
    }
}

exports.deleteComment = async (req, res) => {
    const commentId = req.params.id;
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) return sendErrorResponse(res, 404, "Comment not found");
        await comment.deleteOne();
        const blog = await Blog.findByIdAndUpdate(comment.blogId, { $inc: { commentsCount: -1 - comment.repliesCount } }, { new: true });
        return sendSuccessResponse(res, 200, "Comment deleted successfully", { commentsCount: blog.commentsCount });
    } catch (err) {
        console.log(err.message);
        sendErrorResponse(res, 500, "Server Error")
    }
};


exports.getAllComments = async (req, res) => {
    const { blogId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    console.log(req.query);

    try {
        const skip = (page - 1) * limit;

        const comments = await Comment.find({ blogId })
            .populate('userId', 'name',)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const transformedComments = comments.map(comment => ({
            ...comment.toObject(),
            user: {
                _id: comment.userId._id,
                name: comment.userId.name,
                avatar: comment.userId?.avatar
            },
        }));
        transformedComments.forEach(comment => delete comment.userId);
        setTimeout(() => {
            return sendSuccessResponse(res, 200, "comments", { data: transformedComments });
        }, 3000);
    } catch (error) {
        console.error('Error while fetching comments:', error);
        return sendErrorResponse(res, 500, error.message);
    }
}