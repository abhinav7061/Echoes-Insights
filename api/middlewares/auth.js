const jwt = require("jsonwebtoken")
const User = require("../models/userSchema")
const Blog = require("../models/blogSchema")
const { sendErrorResponse } = require("../lib/sendError")

// Middleware to check if the user has a valid token
exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        const { jwtToken } = req.cookies;

        if (!jwtToken) {
            return sendErrorResponse(res, 401, "Login first to access resources");
        }

        const decoded = await jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        if (!decoded || !decoded._id) {
            return sendErrorResponse(res, 401, "Invalid token or token has expired");
        }

        const user = await User.findById(decoded._id);
        if (!user) {
            return sendErrorResponse(res, 404, "User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
}

exports.isBlogAuthor = async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const authorId = req.user._id;
        const postDoc = await Blog.findById(blogId);
        if (!postDoc) {
            return sendErrorResponse(res, 404, 'Blog not found');
        }
        if (postDoc.author.toString() !== authorId.toString()) {
            return sendErrorResponse(res, 400, 'You are not author of this blog');
        }
        next();
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
}