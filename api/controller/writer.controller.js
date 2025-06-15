const Writer = require('../models/writerSchema');
const User = require('../models/userSchema');
const { sendSuccessResponse, sendErrorResponse } = require('../lib/responseHelper');
const error = require('../middlewares/error');

// 📝 Submit onboarding application
exports.submitApplication = async (req, res) => {
    try {
        const userId = req.user._id;
        const { channelName, channelHandle, bio, sampleWorkLinks, socialLinks, reasonToWrite, acceptTerms } = req.body;

        const exists = await Writer.findOne({ userId });
        if (exists || req.user?.role == 'admin') return sendErrorResponse(res, 400, 'You have already submitted your application.');
        if (!channelName) return sendErrorResponse(res, 400, 'Channel name is required.');
        if (!channelHandle) return sendErrorResponse(res, 400, 'Channel handle is required.');
        if (!reasonToWrite) return sendErrorResponse(res, 400, "Tell about the reason to write");
        if (!acceptTerms) return sendErrorResponse(res, 400, "Please accept the term and condition");
        if (channelName.length < 3 || channelName.length > 50)
            return sendErrorResponse(res, 400, 'Channel name must be between 3 and 50 characters.');
        if (!channelHandle)
            return sendErrorResponse(res, 400, 'Handle is required.');
        if (channelHandle.length < 3 || channelHandle.length > 30)
            return sendErrorResponse(res, 400, 'Handle must be between 3 and 30 characters.');
        if (!/^[a-zA-Z0-9_]+$/.test(channelHandle))
            return sendErrorResponse(res, 400, 'Handle can only include letters, numbers, and underscores.');

        const application = new Writer({
            userId,
            channelName,
            channelHandle: `@${channelHandle.toLowerCase()}`,
            channelImg: {
                url: req.user?.avatar?.url
            },
            bio,
            sampleWorkLinks,
            socialLinks,
            reasonToWrite,
            acceptTerms,
        });

        await application.save();

        sendSuccessResponse(res, 201, 'Application submitted successfully.')
    } catch (err) {
        console.error(err);
        sendErrorResponse(res, 500, 'Application submission failed.');
    }
};

// 🔎 Admin: Get all applications
exports.getAllApplications = async (req, res) => {
    try {
        const apps = await Writer.find().populate('userId', 'name email');
        res.json({ success: true, data: apps });
    } catch (err) {
        console.error(err);
        sendErrorResponse(res, 500, 'Failed to fetch applications.');
    }
};

// 🔎 Admin: Get single application
exports.getApplicationByUser = async (req, res) => {
    try {
        const app = await Writer.findOne({ userId: req.params.applicantId }).populate('userId', 'name email');
        if (!app) return sendErrorResponse(res, 404, 'Application not found.');

        res.json({ success: true, data: app });
    } catch (err) {
        console.error(err);
        sendErrorResponse(res, 500, 'Failed to fetch application.');
    }
};

// ✅ Admin: Approve or reject
exports.updateStatus = async (req, res) => {
    try {
        const { applicantId } = req.params;
        const { status } = req.body;

        const user = await User.findById(applicantId);
        if (!user) return sendErrorResponse(res, 404, 'User not found.');

        const app = await Writer.findOne({ userId: applicantId });
        if (!app) return sendErrorResponse(res, 404, 'Application not found.');

        app.status = status;
        await app.save();

        user.role = 'writer';
        await user.save();

        sendSuccessResponse(res, 200, `Application ${status}`);
    } catch (err) {
        console.error(err);
        sendErrorResponse(res, 500, 'Failed to update status.', { error: error.message });
    }
};

// 👤 Get logged-in user's application
exports.getMyApplication = async (req, res) => {
    try {
        const userId = req.user._id;
        const app = await Writer.findOne({ userId });
        if (!app) return sendErrorResponse(res, 404, 'No application found.');

        res.json({ success: true, data: app });
    } catch (err) {
        console.error(err);
        sendErrorResponse(res, 500, 'Error fetching application.');
    }
};

exports.checkHandleAvailability = async (req, res) => {
    try {
        const { handle } = req.query;
        const existing = await Writer.findOne({ channelHandle: handle.toLowerCase() });
        sendSuccessResponse(res, 200, 'Handle availability checked', { available: !existing });
    } catch (error) {
        sendErrorResponse(res, 500, 'Error checking handle availability', { error: error.message })
    }
}