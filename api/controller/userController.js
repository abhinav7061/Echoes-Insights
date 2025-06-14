const User = require("../models/userSchema");
const Blog = require("../models/blogSchema");
const jwt = require("jsonwebtoken")
const { sendErrorResponse, sendSuccessResponse } = require("../lib/responseHelper");
const { uploadToCloudinary, generateOptimizedUrl } = require("../Config/cloudinary");

exports.registerUser = async (req, res) => {
    const { name, email, password, cpassword } = req.body;
    if (!(name && email && password && cpassword)) return sendErrorResponse(res, 422, 'Please fill all the required fields!');
    if (password !== cpassword) return sendErrorResponse(res, 422, 'Passwords do not match!');
    if (password.length < 8) return sendErrorResponse(res, 422, 'Password must be at least 8 characters long!');
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return sendErrorResponse(res, 422, 'Invalid email format!');
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) return sendErrorResponse(res, 422, 'Password must contain at least one uppercase letter, one lowercase letter, and one number!');
    if (name.length < 3) return sendErrorResponse(res, 422, 'Name must be at least 3 characters long!');
    if (name.length > 50) return sendErrorResponse(res, 422, 'Name must be less than 50 characters long!');
    if (email.length > 100) return sendErrorResponse(res, 422, 'Email must be less than 100 characters long!');
    if (password.length > 100) return sendErrorResponse(res, 422, 'Password must be less than 100 characters long!');
    if (!/^[a-zA-Z\s]+$/.test(name)) return sendErrorResponse(res, 422, 'Name can only contain letters and spaces!');
    try {
        const userExist = await User.findOne({ email });
        if (userExist) return sendErrorResponse(res, 422, 'This email is already in use!');
        const user = new User({ name, email, password });
        await user.save();
        const jwtToken = user.generateToken();

        return sendSuccessResponse(res, 200, 'Registered Successfully', {
            user: { id: user._id, name: user.name, email: user.email, avatar: user?.avatar, role: user?.role },
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

        jwtToken = user.generateToken(remember_me);
        const cookieOptions = { httpOnly: true };
        if (remember_me) cookieOptions.expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        return sendSuccessResponse(res, 200, 'Logged in Successfully', {
            user: { id: user._id, name: user.name, email: user.email, avatar: user?.avatar, role: user?.role, interests: user?.interests, termsAccepted: user?.termsAccepted },
            cookies: [{ name: 'jwtToken', value: jwtToken, options: cookieOptions }],
            jwtToken
        });
    } catch (error) {
        console.error('Error: ', error);
        return sendErrorResponse(res, 500, 'Internal Server Error', { error: error.message });
    }
};

exports.authCallback = async (req, res) => {
    const allowedOrigins = process.env.FRONTEND_URLS.split(",").map((url) => url.trim());
    try {
        const { displayName: name, emails, id, provider } = req.user;
        const email = emails[0].value;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                email,
                name,
                password: 'oauth',
                ...(provider == 'google' && {
                    avatar: {
                        url: req.user?.photos?.[0].value,
                        source: 'oauth',
                        public_id: id
                    }
                }),
            });
        }
        const jwtToken = user.generateToken();
        const options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        return res.cookie("jwtToken", jwtToken, options).send(`
               <script>
                   window.opener.postMessage({
                       type: 'OAUTH_SUCCESS',
                       user: ${JSON.stringify({
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user?.avatar,
            role: user?.role,
            interests: user?.interests,
            termsAccepted: user?.termsAccepted,
        })},
                       token: '${jwtToken}'
                   }, '${allowedOrigins[0]}');
                   window.close();
               </script>
           `);
    } catch (error) {
        console.log({ error });
        res.send(`
            <script>
                window.opener.postMessage({
                    type: 'OAUTH_FAIL',
                    error: '${error}',
                    message: '${error.message}'
                }, '${allowedOrigins[0]}');
                window.close();
            </script>
        `);
    }
};

exports.isUserLoggedIn = async (req, res) => {
    try {
        return sendSuccessResponse(res, 200, 'User is Authenticated', {
            user: { id: req.user._id, name: req.user.name, email: req.user.email, avatar: req.user?.avatar, role: req.user?.role },
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

exports.profilePicture = async (req, res) => {
    try {
        const avatar = req.file;
        const user = await User.findById(req.user._id);
        const result = await uploadToCloudinary(avatar, 'EchoesAndInsights/profile', user?.avatar?.public_id);
        const optimizedUrl = generateOptimizedUrl(result.public_id, result.version);
        user.avatar.url = optimizedUrl;
        user.avatar.public_id = result.public_id;
        await user.save();
        console.log({ user });
        return sendSuccessResponse(res, 200, 'Profile image uploaded successfully', {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user?.avatar,
                role: user?.role
            }
        })
    } catch (error) {
        return sendErrorResponse(res, 500, 'Error uploading image', { error })
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log({
            body: req.body
        })
        const fields = [
            "name",
            "email",
            "phone",
            "gender",
            "interests",
            "termsAccepted",
            "reciveUpdates",
        ];

        const update = {};

        fields.forEach((field) => {
            if (req.body[field] !== undefined) {
                update[field] = req.body[field];
            }
        });

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: update },
            { new: true }
        );

        if (!updatedUser) {
            return sendErrorResponse(res, 404, "User not found");
        }

        sendSuccessResponse(res, 200, "Profile updated successfully!", {
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                avatar: updatedUser?.avatar,
                role: updatedUser?.role,
                interests: updatedUser?.interests,
                termsAccepted: updatedUser?.termsAccepted,
            },
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Error updating the profile", { error });
    }
};