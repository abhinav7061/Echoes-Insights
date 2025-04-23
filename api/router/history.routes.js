const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require('../middlewares/auth');
const { getHistory } = require('../controller/history.controller');

router.get('/', isAuthenticatedUser, getHistory);

module.exports = router;
