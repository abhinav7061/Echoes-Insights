const express = require('express');
const { updateReadingProgress, lastRead } = require('../controller/readingProgressController');
const router = express.Router();
const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/update').post(isAuthenticatedUser, updateReadingProgress);
router.route('/last-read').get(isAuthenticatedUser, lastRead);

module.exports = router;
