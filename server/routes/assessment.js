const express = require('express');
const router = express.Router();
const { runAssessment, getAssessmentResults } = require('../controllers/assessmentController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/assessment/run  — FR2
router.post('/run', protect, runAssessment);

// GET /api/assessment/results  — FR2 get saved results
router.get('/results', protect, getAssessmentResults);

module.exports = router;
