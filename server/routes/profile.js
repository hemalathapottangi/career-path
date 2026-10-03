const express = require('express');
const router = express.Router();
const {
  updateProfile,
  updateSelectedCareer,
  updateSkillProgress,
  getProgress,
  resetProgress,
} = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

// All profile routes require auth
router.use(protect);

// PUT /api/profile  — FR1: Update profile
router.put('/', updateProfile);

// PUT /api/profile/career  — FR6: Set target career
router.put('/career', updateSelectedCareer);

// PUT /api/profile/progress  — FR6: Update a skill status
router.put('/progress', updateSkillProgress);

// GET /api/profile/progress/:careerId  — FR6: Get progress for a career
router.get('/progress/:careerId', getProgress);

// DELETE /api/profile/reset  — NFR1: Clear all saved data
router.delete('/reset', resetProgress);

module.exports = router;
