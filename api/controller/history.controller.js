const ReadingProgress = require("../models/readingProgressSchema")
const { sendErrorResponse, sendSuccessResponse } = require("../lib/responseHelper");

exports.getHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const limit = parseInt(req.query.limit) || 10;
        const cursor = req.query.cursor;

        const query = {
            userId,
            ...(cursor && { updatedAt: { $lt: new Date(cursor) } }),
        };

        const progressDocs = await ReadingProgress
            .find(query)
            .sort({ updatedAt: -1 })
            .limit(limit)
            .populate({
                path: 'blogId',
                select: 'title summary createdAt cover views likesCount',
                populate: {
                    path: 'author',
                    select: 'name'
                }
            });

        const blogs = progressDocs
            .map(doc => doc.blogId)
            .filter(blog => blog);

        const lastHistory = progressDocs?.[progressDocs.length - 1];
        const nextCursor = progressDocs.length === limit ? lastHistory?.updatedAt : null;

        return sendSuccessResponse(res, 200, "History fetched successfully!", {
            data: blogs,
            nextCursor,
        });
    } catch (err) {
        console.error(err);
        return sendErrorResponse(res, 500, "Server Error", { error: err.message });
    }
};
