const { sendErrorResponse, sendSuccessResponse } = require('../lib/responseHelper');
const Blog = require('../models/blogSchema');
const ReadingProgress = require('../models/readingProgressSchema');

exports.updateReadingProgress = async (req, res) => {
    const { blogId, progress } = req.body;
    const userId = req.user._id;
    if (!blogId || progress === undefined) return sendErrorResponse(res, 400, 'Blog ID and progress are required.')

    const blog = await Blog.findById(blogId);
    if (!blog) return sendErrorResponse(res, 404, 'Blog not found');

    try {
        const updatedProgress = await ReadingProgress.findOneAndUpdate(
            { userId, blogId },
            { progress, updatedAt: Date.now() },
            { new: true, upsert: true }
        );

        return sendSuccessResponse(res, 200, 'Reading progress updated', { updatedProgress });
    } catch (error) {
        console.error('Error updating reading progress:', error);
        return sendErrorResponse(res, 400, 'Error updating reading progress');
    }
};

exports.lastRead = async (req, res) => {
    const { blogId } = req.query;
    const userId = req.user._id;
    const blog = await Blog.findById(blogId);
    if (!blog) return sendErrorResponse(res, 404, 'Blog not found');
    try {
        const readingProgress = await ReadingProgress.findOne({ userId, blogId });
        return sendSuccessResponse(res, 200, 'Reading progress updated', { progress: readingProgress?.progress || 0 });
    } catch (error) {
        console.error('Error getting reading progress:', error);
        return sendErrorResponse(res, 400, 'Error getting reading progress');
    }
}