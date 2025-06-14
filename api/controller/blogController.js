const User = require("../models/userSchema");
const mongoose = require("mongoose");
const Blog = require("../models/blogSchema");
const { sendErrorResponse, sendSuccessResponse } = require("../lib/responseHelper");
const { uploadToCloudinary, generateOptimizedUrl, deleteFromCloudinary } = require("../Config/cloudinary");

exports.getAllBlogSummaries = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;
        const searchQuery = req.query.search;
        const sort = req.query.sort;
        let query = {};

        if (searchQuery) {
            query.$or = [
                { title: { $regex: searchQuery, $options: 'i' } },
                { summary: { $regex: searchQuery, $options: 'i' } },
                { content: { $regex: searchQuery, $options: 'i' } },
            ];
        }

        if (sort) {
            if (mongoose.Types.ObjectId.isValid(sort)) {
                query.category = sort;
            }
        }

        const blogsSummary = await Blog.find(query)
            .populate('author', 'channelName channelImg')
            .skip(offset)
            .sort({ createdAt: -1 })
            .limit(limit);

        return sendSuccessResponse(res, 200, 'summeried retrived', { blogsSummary });
    } catch (error) {
        return sendErrorResponse(res, 400, error.message);
    }
};

exports.getBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const postDoc = await Blog.findById(id).populate(
            {
                path: 'author',
                select: 'channelName channelHandle channelImg',
                populate: {
                    path: 'userId',
                    select: 'id'
                }
            });
        if (!postDoc) {
            return sendErrorResponse(res, 404, `Your blog cann't be found`)
        }
        postDoc.views += 1;
        await postDoc.save();
        res.json({
            success: true,
            data: postDoc
        });
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
};

exports.isBlogWriter = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "User is Blog writer",
        isBlogWriter: true,
    });
}

exports.createBlog = async (req, res) => {
    try {
        const cover = req.file;
        const authorId = req.user._id;
        const result = await uploadToCloudinary(cover, 'EchoesAndInsights/BlogCover');
        public_id = result.public_id
        url = generateOptimizedUrl(result.public_id, result.version);
        const { title, summary, content } = req.body;
        const newBlog = await Blog.create({
            title,
            summary,
            content,
            cover: {
                public_id,
                url
            },
            author: authorId,
        });

        sendSuccessResponse(res, 200, 'Blog created successfully', { data: { newBlog } })
    } catch (error) {
        sendErrorResponse(res, 401, error)
        console.log(error)
    }
};

exports.editBlog = async (req, res) => {
    try {
        const { title, summary, content } = req.body;
        const { blogId } = req.params;
        const authorId = req.user._id;
        const postDoc = await Blog.findById(blogId);
        const cover = req.file;
        if (!postDoc) {
            return sendErrorResponse(res, 404, 'Post not found');
        }

        let newUrl = null;
        if (cover) {
            const result = await uploadToCloudinary(cover, 'EchoesAndInsights/BlogCover', postDoc?.cover?.public_id);
            const optimizedUrl = generateOptimizedUrl(result.public_id, result.version);
            postDoc.cover.url = optimizedUrl;
            postDoc.cover.public_id = result.public_id;
        }
        postDoc.title = title;
        postDoc.summary = summary;
        postDoc.content = content;
        postDoc.cover = newUrl ? newUrl : postDoc.cover;
        await postDoc.save();
        res.json({
            success: true,
            message: 'Blog Updated Successfully'
        });
    } catch (error) {
        sendErrorResponse(res, 401, error)
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const postDoc = await Blog.findById(blogId);
        if (!postDoc) {
            return sendErrorResponse(res, 404, 'Blog not found');
        }
        await deleteFromCloudinary(postDoc?.cover?.public_id)
        await postDoc.deleteOne();
        return sendSuccessResponse(res, 200, 'Blog Deleted Successfully');
    } catch (error) {
        sendErrorResponse(res, 401, error.message)
    }
};

exports.getShorts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const cursor = req.query.cursor;

        let currentShort = null;

        if (cursor && cursor !== 'undefined') {
            currentShort = await Blog.findById(cursor)
                .populate('author', 'channelName channelImg')
                .select('title summary createdAt cover author');
        }
        if (!currentShort) {
            currentShort = await Blog.findOne()
                .populate('author', 'channelName channelImg')
                .sort({ createdAt: -1 })
                .select('title summary createdAt cover author')
                .limit(1);
        }

        if (!currentShort) return sendErrorResponse(res, 400, "No shorts available")

        const shortsBefore = await Blog.find({ createdAt: { $lt: currentShort.createdAt } })
            .populate('author', 'channelName channelImg')
            .sort({ createdAt: -1 })
            .limit(limit - 1)
            .select('title summary createdAt cover author');
        const shorts = [
            currentShort,
            ...shortsBefore,
        ];
        const nextShort = await Blog.findOne({ createdAt: { $lt: shorts[shorts.length - 1]?.createdAt } })
            .sort({ createdAt: -1 })
            .select('_id');

        const nextCursor = nextShort ? nextShort._id : null;

        return sendSuccessResponse(res, 200, 'Shorts fetched', { data: shorts, nextCursor });
    } catch (error) {
        return sendErrorResponse(res, 400, error.message);
    }
};
