const express = require('express');
const router = express.Router();
const { getAllCareers, getCareerById, getSkillGap, getCatalogData } = require('../controllers/careerController');
const { protect } = require('../middleware/authMiddleware');

// GET /api/careers/catalog  — skills, interests, degree options
router.get('/catalog', getCatalogData);

// GET /api/careers  — FR7: Career Explorer (public)
router.get('/', getAllCareers);

// GET /api/careers/:id  — FR4: Career details
router.get('/:id', getCareerById);

// GET /api/careers/:id/skill-gap  — FR4: Skill gap (protected, uses user's skills)
router.get('/:id/skill-gap', protect, getSkillGap);

module.exports = router;
