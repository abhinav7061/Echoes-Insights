const User = require("../models/userSchema");
const mongoose = require("mongoose");
const Blog = require("../models/blogSchema");
const { sendErrorResponse } = require("../lib/sendError");
const { renameFileUploadedByMulter } = require("../lib/renameFileUploadedByMulter");
const { deleteFile } = require("../lib/deleteFile");

exports.getAllBlogSummaries = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;
        const searchQuery = req.query.search;
        console.log(req.query);
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
            .select('title summary cover author createdAt')
            .populate('author', 'name')
            .skip(offset)
            .sort({ createdAt: -1 })
            .limit(limit);

        return res.json({
            success: true,
            blogsSummary,
        });
    } catch (error) {
        return sendErrorResponse(res, 400, error.message);
    }
};

exports.getBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const postDoc = await Blog.findById(id).populate('author', ['name']);
        if (!postDoc) {
            return sendErrorResponse(res, 404, `Your blog cann't be found`)
        }
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
        const { originalname, path } = req.file;
        const authorId = req.user._id;
        const ulr = await renameFileUploadedByMulter(originalname, path);
        const { title, summary, content } = req.body;
        await Blog.create({
            title,
            summary,
            content,
            cover: ulr,
            author: authorId,
        });

        res.json({
            success: true,
            message: 'Blog created successfully'
        });
    } catch (error) {
        sendErrorResponse(res, 401, error)
    }
};

exports.editBlog = async (req, res) => {
    try {
        const { title, summary, content } = req.body;
        const { blogId } = req.params;
        const authorId = req.user._id;
        const postDoc = await Blog.findById(blogId);
        if (!postDoc) {
            return sendErrorResponse(res, 404, 'Post not found');
        }
        if (postDoc.author.toString() !== authorId.toString()) {
            return sendErrorResponse(res, 400, 'You are not the author');
        }
        let newUrl = null;
        if (req.file) {
            const { originalname, path } = req.file;
            const folderPath = path.substring(0, path.lastIndexOf('/'));
            newUrl = await renameFileUploadedByMulter(originalname, path);
            await deleteFile(folderPath, postDoc.cover);
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
        await deleteFile('uploads/blog_cover/', postDoc.cover);
        await postDoc.deleteOne();
        res.json({
            success: true,
            message: 'Blog Deleted Successfully'
        });
    } catch (error) {
        sendErrorResponse(res, 401, error.message)
    }
};
