const express = require('express');
const router = express.Router();
const { submitSampleBlog, getSampleBlogByUser, getAllSampleBlogs } = require('../controller/sampleBlog.controller');
const { isAuthenticatedUser, isAdmin } = require('../middlewares/auth');
const multerMiddleware = require('../middlewares/multer');

router.post('/submit', isAuthenticatedUser, multerMiddleware('cover'), submitSampleBlog);
router.get('/user/:userId', isAuthenticatedUser, isAdmin, getSampleBlogByUser);
router.get('/all', isAuthenticatedUser, isAdmin, getAllSampleBlogs);

module.exports = router;
