const CommentLike = require('../models/commentLikeSchema');
const CommentReplyLike = require('../models/commentReplyLikeSchema');
const BlogLike = require('../models/blogLikeSchema');
const Comment = require('../models/commentSchema');
const CommentReply = require('../models/commentReplySchema');
const Blog = require('../models/blogSchema');
const { sendErrorResponse, sendSuccessResponse } = require("../lib/responseHelper");

exports.toggleBlogLike = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user._id;
        const blog = await Blog.findById(blogId);
        if (!blog) return sendErrorResponse(res, 404, 'Blog not found');

        const existingLike = await BlogLike.findOne({ blogId, userId });

        if (existingLike) {
            await BlogLike.findByIdAndDelete(existingLike._id);
            return sendSuccessResponse(res, 200, 'Blog disliked');
        } else {
            await BlogLike.create({ blogId, userId });
            return sendSuccessResponse(res, 201, 'Blog liked');
        }
    } catch (error) {
        return sendErrorResponse(res, 500, error.message);
    }
};

exports.toggleCommentLike = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);
        if (!comment) return sendErrorResponse(res, 404, 'Comment not found');

        const existingLike = await CommentLike.findOne({ commentId, userId });

        if (existingLike) {
            await CommentLike.findByIdAndDelete(existingLike._id);
            return sendSuccessResponse(res, 200, 'Comment disliked');
        } else {
            await CommentLike.create({ commentId, userId });
            return sendSuccessResponse(res, 201, 'Comment liked');
        }
    } catch (error) {
        return sendErrorResponse(res, 500, error.message);
    }
};

exports.toggleCommentReplyLike = async (req, res) => {
    try {
        const { commentReplyId } = req.params;
        const userId = req.user._id;

        const commentReply = await CommentReply.findById(commentReplyId);
        if (!commentReply) return sendErrorResponse(res, 404, 'Comment reply not found');

        const existingLike = await CommentReplyLike.findOne({ commentReplyId, userId });

        if (existingLike) {
            await CommentReplyLike.findByIdAndDelete(existingLike._id);
            return sendSuccessResponse(res, 200, 'Comment reply disliked');
        } else {
            await CommentReplyLike.create({ commentReplyId, userId });
            return sendSuccessResponse(res, 201, 'Comment reply liked');
        }
    } catch (error) {
        return sendErrorResponse(res, 500, error.message);
    }
};

exports.checkBlogLike = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user._id;
        const existingLike = await BlogLike.findOne({ blogId, userId });

        return sendSuccessResponse(res, 200, null, { liked: !!existingLike });
    } catch (error) {
        return sendErrorResponse(res, 500, error.message);
    }
};

exports.checkCommentLike = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user._id;

        const existingLike = await CommentLike.findOne({ commentId, userId });

        return sendSuccessResponse(res, 200, null, { liked: !!existingLike });
    } catch (error) {
        return sendErrorResponse(res, 500, error.message);
    }
};

exports.checkCommentReplyLike = async (req, res) => {
    try {
        const { commentReplyId } = req.params;
        const userId = req.user._id;

        const existingLike = await CommentReplyLike.findOne({ commentReplyId, userId });

        return sendSuccessResponse(res, 200, null, { liked: !!existingLike });
    } catch (error) {
        return sendErrorResponse(res, 500, error.message);
    }
};
