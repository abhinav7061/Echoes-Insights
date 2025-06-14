const BlogSave = require("../models/blogSaveSchema");
const Blog = require("../models/blogSchema");
const { sendErrorResponse, sendSuccessResponse } = require("../lib/responseHelper");

exports.toggleBlogSave = async (req, res) => {
    try {
        const userId = req.user._id;
        const blogId = req.params.blogId;
        const blog = await Blog.findById(blogId)
        if (!blog) return sendErrorResponse(res, 404, "Blog not found");
        const existingSave = await BlogSave.findOne({ blogId, userId });

        if (existingSave) {
            await BlogSave.findByIdAndDelete(existingSave._id);
            return sendSuccessResponse(res, 200, 'Blog unsaved');
        } else {
            await BlogSave.create({ blogId, userId });
            return sendSuccessResponse(res, 201, 'Blog saved');
        }
    } catch (error) {
        sendErrorResponse(res, 500, error.message)
    }
}

exports.checkBlogSave = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user._id;
        const existingSave = await BlogSave.findOne({ userId, blogId });

        return sendSuccessResponse(res, 200, '', { saved: !!existingSave });
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
}

exports.mySavedBlogs = async (req, res) => {
    try {
        const userId = req.user._id;
        const limit = parseInt(req.query.limit) || 10;
        const cursor = req.query.cursor;

        const query = {
            userId,
            ...(cursor && { createdAt: { $lt: new Date(cursor) } })
        };

        const savedDocs = await BlogSave.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate({
                path: 'blogId',
                select: 'title summary createdAt cover views likesCount author',
                populate: {
                    path: 'author',
                    select: 'name avatar'
                }
            });

        const blogs = savedDocs
            .map(doc => doc.blogId)
            .filter(blog => blog);

        const lastDoc = savedDocs?.[savedDocs.length - 1];
        const nextCursor = savedDocs.length === limit ? lastDoc?.createdAt : null;

        return sendSuccessResponse(res, 200, "Saved blogs fetched successfully", {
            data: blogs,
            nextCursor,
        });
    } catch (err) {
        console.error(err);
        return sendErrorResponse(res, 500, "Server Error", { error: err.message });
    }
};

