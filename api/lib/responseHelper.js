// Helper function to set or delete cookies
const handleCookies = (res, cookies) => {
    if (cookies && Array.isArray(cookies)) {
        cookies.forEach(cookie => {
            const { name, value, options: cookieOptions } = cookie;
            if (value === null) {
                // Delete cookie if value is null
                res.clearCookie(name, cookieOptions);
            } else {
                // Set cookie
                res.cookie(name, value, cookieOptions);
            }
        });
    }
};

// Function to send error response
exports.sendErrorResponse = (res, statusCode, message, options = {}) => {
    const { cookies, ...restOptions } = options;

    // Handle cookies
    handleCookies(res, cookies);

    // Send error response
    return res.status(statusCode).json({
        success: false,
        message,
        ...restOptions
    });
};

// Function to send success response
exports.sendSuccessResponse = (res, statusCode, message, options = {}) => {
    const { cookies, ...restOptions } = options;

    // Handle cookies
    handleCookies(res, cookies);

    // Send success response
    return res.status(statusCode).json({
        success: true,
        message,
        ...restOptions
    });
};
