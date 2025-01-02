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
        const savedBlogs = await BlogSave.find({ userId });
        const userSavedBlogs = savedBlogs.filter(save => save.blogId !== null);
        const blogIds = userSavedBlogs.map((save) => save.blogId);

        await getBlogByCriteria(req, res, { blogIds });
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
};

