const jwt = require("jsonwebtoken")
const User = require("../models/userSchema")
const Blog = require("../models/blogSchema")
const { sendErrorResponse } = require("../lib/responseHelper")
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Middleware to check if the user has a valid token
exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        const jwtToken = req?.cookies?.jwtToken || req?.body?.jwtToken || req?.headers["authorization"].replace("Bearer ", "");

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

exports.demoRestrictionMiddleware = async (req, res, next) => {
    const demoUserEmails = [
        'pollab@pollab.pollab',
        'test@test.test'
    ]
    const demoUserIds = [
        new ObjectId("654781a76070c76f9efda954"),
        new ObjectId("65676e80d7cd99abe88b4e4f")
    ];
    const isDemoUser = demoUserIds.some(id => id.equals(req?.user?._id)) || demoUserEmails.includes(req?.body?.email);

    if (isDemoUser && req.method !== 'GET') {
        return sendErrorResponse(res, 403, 'This is a Demo User.');
    }
    next();
}