const SampleBlog = require('../models/SampleBlog');
const { uploadToCloudinary, generateOptimizedUrl, deleteFromCloudinary } = require("../Config/cloudinary");
const { sendSuccessResponse, sendErrorResponse } = require('../lib/responseHelper');

exports.submitSampleBlog = async (req, res) => {
    try {
        const userId = req.user._id;
        const { title, summary, content } = req.body;
        let coverImage = {};

        if (req.cover) {
            const result = await uploadToCloudinary(req.file, 'EchoesAndInsights/SampleBlogCover');
            coverImage = {
                public_id: result.public_id,
                url: generateOptimizedUrl(result.public_id, result.version),
            };
        }

        // Optional: Avoid multiple sample blogs from same user
        const existing = await SampleBlog.findOne({ user: userId });
        if (existing) {
            return sendErrorResponse(res, 400, 'Sample blog already submitted.');
        }

        await SampleBlog.create({
            user: userId,
            title,
            summary,
            content,
            cover: coverImage,
        });

        res.status(201).json({
            success: true,
            message: 'Sample blog submitted successfully',
        });
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Failed to submit sample blog');
    }
};

exports.getSampleBlogByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const sampleBlog = await SampleBlog.findOne({ user: userId });
        if (!sampleBlog) {
            return sendErrorResponse(res, 404, 'No sample blog found for this user');
        }

        res.status(200).json({
            success: true,
            data: sampleBlog,
        });
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Error fetching sample blog');
    }
};

// (Optional) Admin: Get all sample blogs
exports.getAllSampleBlogs = async (req, res) => {
    try {
        const blogs = await SampleBlog.find().populate('user', 'name email');
        res.json({ success: true, data: blogs });
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Error fetching sample blogs');
    }
};
