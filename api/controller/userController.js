const User = require("../models/userSchema");
const Blog = require("../models/blogSchema");
const jwt = require("jsonwebtoken")
const { sendErrorResponse } = require("../lib/sendError");

// signup routes for the new user
exports.registerUser = async (req, res) => {
    const { name, email, password, phone, gender } = req.body;
    if (!(name && email && password && phone && gender)) {
        return res.status(422).json({ message: 'pls fill the all required fields' });
    }
    try {
        const userExist = await User.findOne({ email });

        // if user already exists the throwing error 
        if (userExist) {
            return res.status(422).json({ message: 'User exists' });
        }
        const user = new User({ name, email, password, phone, gender });

        await user.save();  // saving the data of new user
        jwtToken = user.generateToken();
        const options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        res.status(200).cookie("jwtToken", jwtToken, options).json({
            success: true,
            user: { name: user.name, email: user.email, avatart: user?.avatar },
            message: "Registered Successfully",
        });
    } catch (err) {
        sendErrorResponse(res, 500, error.message);
        console.log(err);
    }
};

//login route for the user
exports.loginUser = async (req, res) => {
    try {
        // Get user input for login
        const { email, password } = req.body;

        // If user not intered the email or password, return error message
        if (!email) return sendErrorResponse(res, 400, "Email is required");
        if (!password) return sendErrorResponse(res, 400, "Password is required");

        // Find user by email
        const user = await User.findOne({ email });
        const isPasswordMatch = await user.matchPassword(password);
        if (!user || !isPasswordMatch) return sendErrorResponse(res, 404, "Invalid Credential");

        let { jwtToken } = req.cookies;
        if (jwtToken) return sendErrorResponse(res, 400, "you are already logged in");
        jwtToken = user.generateToken();
        const options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        res.status(200).cookie("jwtToken", jwtToken, options).json({
            success: true,
            user: { name: user.name, email: user.email, avatart: user?.avatar },
            message: "Loggedin Successfully",
        });

    } catch (error) {
        console.log("error: " + error);
    }
};

exports.isUserLoggedIn = async (req, res) => {

    try {
        const user = await User.findOne(req.user._id);
        res.status(200).json({
            success: true,
            message: "User is Authenticated",
            user: { name: user.name, email: user.email, avatart: user?.avatar },
            isUserAuthenticated: true,
        });
    } catch (error) {
        sendErrorResponse(res, 500, 'Server Error');
    }
}

exports.logoutUser = async (req, res) => {
    try {
        const jwtToken = req.cookies.jwtToken;
        if (!jwtToken)
            return sendErrorResponse(res, 401, "you are already logged out");
        res.status(200)
            .cookie("jwtToken", null, { expires: new Date(Date.now()) })
            .json({
                success: true,
                message: "Logged Out successfully",
            });
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
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

        res.status(200).json({
            success: true,
            message: "Password Changed",
        });

    } catch (error) {
        console.log("error: " + error);
    }
};

