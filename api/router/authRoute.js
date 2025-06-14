const express = require('express');
const router = express.Router();
const passport = require('passport');
const { authCallback } = require('../controller/userController');

// Google OAuth
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
}));
router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    authCallback
);

// Microsoft OAuth
router.get('/microsoft', passport.authenticate('microsoft', {
    scope: ['openid', 'profile', 'email', 'User.Read'],
    session: false
}));
router.get('/microsoft/callback',
    passport.authenticate('microsoft', { session: false }),
    authCallback
);

module.exports = router;