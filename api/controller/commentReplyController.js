const { sendErrorResponse, sendSuccessResponse } = require("../lib/responseHelper");
const User = require("../models/userSchema");
const Comment = require('../models/commentSchema');
const CommentReply = require("../models/commentReplySchema");
const Blog = require("../models/blogSchema");

exports.createCommentReply = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const user = req.user;
        const userId = user._id;
        const { reply } = req.body;
        if (!reply.trim()) return sendErrorResponse(res, 400, 'reply is required');
        const comment = await Comment.findByIdAndUpdate(commentId, { $inc: { repliesCount: 1 } }, { new: true });
        if (!comment) return sendErrorResponse(res, 404, "Comment not found");
        const blog = await Blog.findByIdAndUpdate(comment.blogId, { $inc: { commentsCount: 1 } }, { new: true });
        if (!blog) return sendErrorResponse(res, 404, "Blog not found")
        const newReply = new CommentReply({
            reply,
            commentId,
            userId
        });
        await newReply.save();

        const transformedReply = {
            ...newReply.toObject(),
            user: {
                _id: user._id,
                name: user.name,
                avatar: user?.avatar
            },
        };
        delete transformedReply.userId;

        return sendSuccessResponse(res, 200, 'Reply added', { newReply: transformedReply, repliesCount: comment.repliesCount, commentsCount: blog.commentsCount })
    } catch (error) {
        sendErrorResponse(res, 500, error.message)
    }
}

exports.editCommentReply = async (req, res) => {
    try {
        const commentId = req.params.id;
        const { newReplyValue } = req.body;
        if (!newReplyValue.trim()) return sendErrorResponse(res, 400, 'New reply value is required');
        const existingReply = await CommentReply.findById(commentId);
        if (!existingReply) return sendErrorResponse(res, 404, "this reply not found");

        existingReply.reply = newReplyValue;
        await existingReply.save();
        return sendSuccessResponse(res, 200, 'Reply updated', { updatedReply: newReplyValue });
    } catch (error) {
        sendErrorResponse(res, 500, error.message)
    }
}

exports.deleteCommentReply = async (req, res) => {
    const replyId = req.params.id;
    try {
        const reply = await CommentReply.findById(replyId);
        if (!reply) return sendErrorResponse(res, 404, "Reply not found");
        await reply.deleteOne();
        const comment = await Comment.findByIdAndUpdate(reply.commentId, { $inc: { repliesCount: -1 } }, { new: true });
        if (!comment) return sendErrorResponse(res, 404, "Comment not found");
        const blog = await Blog.findByIdAndUpdate(comment.blogId, { $inc: { commentsCount: -1 } }, { new: true });
        if (!blog) return sendErrorResponse(res, 404, "Blog not found");

        return sendSuccessResponse(res, 200, "Comment deleted successfully", { commentsCount: blog.commentsCount, repliesCount: comment.repliesCount });
    } catch (err) {
        console.log(err.message);
        sendErrorResponse(res, 500, "Server Error")
    }
};

exports.getAllCommentReplies = async (req, res) => {
    const { commentId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    try {
        const skip = (page - 1) * limit;
        const replies = await CommentReply.find({ commentId })
            .populate('userId', 'name avatar')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const transformedReplies = replies.map(reply => ({
            ...reply.toObject(),
            user: {
                _id: reply.userId._id,
                name: reply.userId.name,
                avatar: reply.userId?.avatar
            },
        }));
        transformedReplies.forEach(reply => delete reply.userId);

        return sendSuccessResponse(res, 200, "replies", { replies: transformedReplies });
    } catch (error) {
        console.error('Error while fetching replies:', error);
        return sendErrorResponse(res, 500, error.message);
    }
}