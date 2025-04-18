const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const ErrorHandling = require("./middlewares/error");

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

//importing routes
const user = require("./router/userRoutes");
const blog = require("./router/blogRoutes");
const like = require("./router/likeRoutes");
const saveBlog = require("./router/blogSaveRoutes");
const follow = require("./router/followerRoutes");
const readingProgress = require("./router/readingProgressRoutes");
const comment = require("./router/commentRoutes");
const commentReply = require("./router/commentReplyRoutes");
const writer = require("./router/writer.routes");
const sampleBlog = require("./router/sampleBlog.routes");

//using routes
app.use("/api/v1/user", user);
app.use("/api/v1/blog", blog);
app.use("/api/v1/like", like);
app.use("/api/v1/save-blog", saveBlog);
app.use("/api/v1/follow", follow);
app.use("/api/v1/reading-progress", readingProgress);
app.use("/api/v1/comment", comment);
app.use("/api/v1/comment-reply", commentReply);
app.use("/api/v1/writer", writer)
app.use("/api/v1/sampleBlog", sampleBlog)
app.use('/api/v1/blog-cover', express.static(__dirname + '/uploads/blog_cover')); // route to  serve the static file(profile image in this project)

app.get('/', (req, res) => {
    res.send('Welcome to the Echoes-Insights API!');
});

// Handle undefined routes
app.use((req, res, next) => {
    const error = new Error(`Cannot find Resource on this server!`);
    error.statusCode = 404;
    next(error);
});

//using error middlewares
app.use(ErrorHandling);


module.exports = app;
