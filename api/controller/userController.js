const User = require("../models/userSchema");
const Blog = require("../models/blogSchema");
const jwt = require("jsonwebtoken")
const { sendErrorResponse, sendSuccessResponse } = require("../lib/responseHelper");

exports.registerUser = async (req, res) => {
    const { name, email, password, phone, gender } = req.body;
    if (!(name && email && password && phone && gender)) return sendErrorResponse(res, 422, 'Please fill all the required fields!');

    try {
        const userExist = await User.findOne({ email });
        if (userExist) return sendErrorResponse(res, 422, 'This email is already in use!');
        const user = new User({ name, email, password, phone, gender });
        await user.save();
        const jwtToken = user.generateToken();

        return sendSuccessResponse(res, 200, 'Registered Successfully', {
            user: { id: user._id, name: user.name, email: user.email, avatar: user?.avatar },
            cookies: [{ name: 'jwtToken', value: jwtToken, options: { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true } }],
            jwtToken
        });
    } catch (error) {
        console.error(error);
        return sendErrorResponse(res, 500, 'Internal Server Error', { error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password, remember_me } = req.body;

    if (!email) return sendErrorResponse(res, 400, 'Email is required');
    if (!password) return sendErrorResponse(res, 400, 'Password is required');

    try {
        const user = await User.findOne({ email });
        if (!user) return sendErrorResponse(res, 404, 'Invalid Credentials');
        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) return sendErrorResponse(res, 404, 'Invalid Credentials');

        jwtToken = user.generateToken();
        const cookieOptions = { httpOnly: true };
        if (remember_me) cookieOptions.expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        return sendSuccessResponse(res, 200, 'Logged in Successfully', {
            user: { id: user._id, name: user.name, email: user.email, avatar: user?.avatar },
            cookies: [{ name: 'jwtToken', value: jwtToken, options: cookieOptions }],
            jwtToken
        });
    } catch (error) {
        console.error('Error: ', error);
        return sendErrorResponse(res, 500, 'Internal Server Error', { error: error.message });
    }
};

exports.isUserLoggedIn = async (req, res) => {
    try {
        return sendSuccessResponse(res, 200, 'User is Authenticated', {
            user: { id: req.user._id, name: req.user.name, email: req.user.email, avatar: req.user?.avatar },
            isUserAuthenticated: true,
        });
    } catch (error) {
        console.error(error);
        return sendErrorResponse(res, 500, 'Internal Server Error', { error: error.message });
    }
}

exports.logoutUser = async (req, res) => {
    try {
        return sendSuccessResponse(res, 200, 'Logged Out Successfully', {
            cookies: [{ name: 'jwtToken', value: null, options: { httpOnly: true, expires: new Date(Date.now()) } }]
        });
    } catch (error) {
        console.error(error);
        return sendErrorResponse(res, 500, 'Internal Server Error', { error: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email, new_password } = req.body;
        if (!email) return sendErrorResponse(res, 400, "Email is required");

        const user = await User.findOne({ email });
        if (!user) return sendErrorResponse(res, 404, "There is no account with this email");
        if (!new_password) return sendErrorResponse(res, 400, "Enter new password");

        user.password = req.body.new_password;
        await user.save();

        return sendSuccessResponse(res, 200, "Password Changed");
    } catch (error) {
        console.error(error);
        return sendErrorResponse(res, 500, 'Internal Server Error', { error: error.message });
    }
};

