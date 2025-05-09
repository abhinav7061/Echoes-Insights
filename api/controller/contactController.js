const { sendErrorResponse, sendSuccessResponse } = require('../lib/responseHelper.js');
const ContactMessage = require('../models/ContactMessage.js');

exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return sendErrorResponse(res, 400, "All fields are required.")
        }

        const newMessage = new ContactMessage({
            name,
            email,
            subject,
            message
        });

        await newMessage.save();
        sendSuccessResponse(res, 201, 'Your message has been received. We will contact you shortly.')
    } catch (error) {
        sendErrorResponse(res, 500, 'Server error. Please try again later.', { error: error.message })
    }
};
