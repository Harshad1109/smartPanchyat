const express = require('express');
const {
    createGrievance,
    getGrievances,
    updateGrievanceStatus,
    getGrievanceById
} = require('../controllers/grievanceController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.use(protect); // All grievance routes require authentication

router.route('/')
    .post(authorize('citizen'), upload.array('media', 3), createGrievance)
    .get(getGrievances);

router.route('/:id')
    .get(getGrievanceById);

router.route('/:id/status')
    .put(authorize('officer', 'admin'), updateGrievanceStatus);

module.exports = router;
