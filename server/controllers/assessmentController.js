const { getIsMemoryMode } = require('../config/db');
const memoryStore = require('../config/memoryStore');
const { getRecommendations } = require('../utils/recommendationEngine');

// FR2: Run career assessment and save results
const runAssessment = async (req, res, next) => {
  try {
    const profile = req.body.profile || req.user.profile;

    if (!profile || !profile.skills || profile.skills.length === 0) {
      return res.status(400).json({ success: false, message: 'Profile must include at least one skill to run assessment.' });
    }
    if (!profile.interests || profile.interests.length === 0) {
      return res.status(400).json({ success: false, message: 'Profile must include at least one interest to run assessment.' });
    }

    const recommendations = getRecommendations(profile);

    const resultsPayload = {
      profile,
      recommendations,
      runAt: new Date().toISOString(),
    };

    // Persist results
    if (getIsMemoryMode()) {
      const idx = memoryStore.users.findIndex((u) => u._id === String(req.user._id));
      if (idx !== -1) {
        memoryStore.users[idx].profile = profile;
        memoryStore.users[idx].assessmentResults = resultsPayload;
      }
    } else {
      const User = require('../models/User');
      await User.findByIdAndUpdate(req.user._id, { profile, assessmentResults: resultsPayload });
    }

    return res.json({
      success: true,
      message: recommendations.length > 0
        ? `Found ${recommendations.length} career match${recommendations.length > 1 ? 'es' : ''} for your profile.`
        : 'No close career matches found. Try adding more skills or interests.',
      data: resultsPayload,
    });
  } catch (err) {
    next(err);
  }
};

// Get last assessment results
const getAssessmentResults = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user.assessmentResults) {
      return res.json({ success: true, message: 'No assessment run yet.', data: null });
    }
    return res.json({ success: true, data: user.assessmentResults });
  } catch (err) {
    next(err);
  }
};

module.exports = { runAssessment, getAssessmentResults };
