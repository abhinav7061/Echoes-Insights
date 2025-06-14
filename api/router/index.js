const express = require('express');
const user = require("./userRoutes");
const blog = require("./blogRoutes");
const like = require("./likeRoutes");
const saveBlog = require("./blogSaveRoutes");
const follow = require("./followerRoutes");
const readingProgress = require("./readingProgressRoutes");
const comment = require("./commentRoutes");
const commentReply = require("./commentReplyRoutes");
const writer = require("./writer.routes");
const sampleBlog = require("./sampleBlog.routes");
const history = require("./history.routes");
const contact = require('./contactRoutes')
const auth = require('./authRoute')

const router = express.Router();

// Using routes
router.use("/user", user);
router.use("/blog", blog);
router.use("/like", like);
router.use("/save-blog", saveBlog);
router.use("/follow", follow);
router.use("/reading-progress", readingProgress);
router.use("/comment", comment);
router.use("/comment-reply", commentReply);
router.use("/writer", writer);
router.use("/sampleBlog", sampleBlog);
router.use("/history", history);
router.use("/contact", contact);
router.use("/auth", auth);

router.get('/', (req, res) => {
    res.send('Welcome to the Echoes-Insights API!');
});

// Handle undefined routes
router.use((req, res, next) => {
    const error = new Error(`Cannot find Resource on this server!`);
    error.statusCode = 404;
    next(error);
});

// Error handling middleware
const { ErrorHandling } = require('../middlewares/error');
router.use(ErrorHandling); 

module.exports = router;