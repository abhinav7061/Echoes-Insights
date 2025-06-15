const express = require('express');
const router = express.Router();
const { submitApplication, getMyApplication, getAllApplications, getApplicationByUser, updateStatus, checkHandleAvailability } = require('../controller/writer.controller');
const { isAuthenticatedUser, isAdmin } = require('../middlewares/auth');

router.post('/apply', isAuthenticatedUser, submitApplication);
router.get('/my', isAuthenticatedUser, getMyApplication);
router.get('/all', isAuthenticatedUser, isAdmin, getAllApplications);
router.get('/check-handle', checkHandleAvailability);
router.get('/:applicantId', isAuthenticatedUser, isAdmin, getApplicationByUser);
router.patch('/status/:applicantId', isAuthenticatedUser, isAdmin, updateStatus);

module.exports = router;
