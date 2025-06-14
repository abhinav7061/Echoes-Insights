const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./router");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;

dotenv.config({ path: './Config/config.env' });
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const cors = require("cors");
app.use('/uploads', express.static(__dirname + '/uploads'));
const allowedOrigins = process.env.FRONTEND_URLS.split(',');

// Configure CORS to allow requests from the allowed origins
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/auth/google/callback`
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));
passport.use(new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/auth/microsoft/callback`,
    scope: ['user.read'],
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

app.use('/api/v1', routes);

module.exports = app;
