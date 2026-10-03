const { getIsMemoryMode } = require('../config/db');
const memoryStore = require('../config/memoryStore');

const sanitise = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  profile: user.profile,
  selectedCareer: user.selectedCareer,
  skillProgress: user.skillProgress,
  assessmentResults: user.assessmentResults,
  createdAt: user.createdAt,
});

// FR1: Update user profile
const updateProfile = async (req, res, next) => {
  try {
    const {
      degree, branch, currentYear, skills, interests,
      experienceLevel, preferredCareerArea,
    } = req.body;

    // Validation as per FR1
    if (!degree) return res.status(400).json({ success: false, message: 'Please select a degree.' });
    if (!skills || skills.length === 0) return res.status(400).json({ success: false, message: 'Please select at least one skill.' });
    if (!interests || interests.length === 0) return res.status(400).json({ success: false, message: 'Please select at least one interest.' });

    const profileData = { degree, branch: branch || '', currentYear: currentYear || '', skills, interests, experienceLevel: experienceLevel || '', preferredCareerArea: preferredCareerArea || '' };

    if (getIsMemoryMode()) {
      const idx = memoryStore.users.findIndex((u) => u._id === String(req.user._id));
      if (idx === -1) return res.status(404).json({ success: false, message: 'User not found.' });
      memoryStore.users[idx].profile = profileData;
      return res.json({ success: true, message: 'Profile updated.', data: { user: sanitise(memoryStore.users[idx]) } });
    }

    const User = require('../models/User');
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { profile: profileData } },
      { new: true, runValidators: true }
    );
    return res.json({ success: true, message: 'Profile updated.', data: { user: sanitise(user) } });
  } catch (err) {
    next(err);
  }
};

// FR6: Update selected career
const updateSelectedCareer = async (req, res, next) => {
  try {
    const { careerId } = req.body;

    if (getIsMemoryMode()) {
      const idx = memoryStore.users.findIndex((u) => u._id === String(req.user._id));
      if (idx === -1) return res.status(404).json({ success: false, message: 'User not found.' });
      memoryStore.users[idx].selectedCareer = careerId || '';
      return res.json({ success: true, message: 'Target career updated.', data: { selectedCareer: careerId } });
    }

    const User = require('../models/User');
    const user = await User.findByIdAndUpdate(req.user._id, { selectedCareer: careerId || '' }, { new: true });
    return res.json({ success: true, message: 'Target career updated.', data: { selectedCareer: user.selectedCareer } });
  } catch (err) {
    next(err);
  }
};

// FR6: Update skill progress
const updateSkillProgress = async (req, res, next) => {
  try {
    const { careerId, skillId, status } = req.body;
    const validStatuses = ['Not Started', 'In Progress', 'Completed'];

    if (!careerId || !skillId) return res.status(400).json({ success: false, message: 'careerId and skillId are required.' });
    if (!validStatuses.includes(status)) return res.status(400).json({ success: false, message: `Status must be one of: ${validStatuses.join(', ')}` });

    if (getIsMemoryMode()) {
      const idx = memoryStore.users.findIndex((u) => u._id === String(req.user._id));
      if (idx === -1) return res.status(404).json({ success: false, message: 'User not found.' });
      if (!memoryStore.users[idx].skillProgress) memoryStore.users[idx].skillProgress = {};
      if (!memoryStore.users[idx].skillProgress[careerId]) memoryStore.users[idx].skillProgress[careerId] = {};
      memoryStore.users[idx].skillProgress[careerId][skillId] = status;
      return res.json({ success: true, message: 'Progress updated.', data: { skillProgress: memoryStore.users[idx].skillProgress } });
    }

    const User = require('../models/User');
    const updateKey = `skillProgress.${careerId}.${skillId}`;
    const user = await User.findByIdAndUpdate(req.user._id, { $set: { [updateKey]: status } }, { new: true });
    return res.json({ success: true, message: 'Progress updated.', data: { skillProgress: user.skillProgress } });
  } catch (err) {
    next(err);
  }
};

// FR6: Get full progress for a career
const getProgress = async (req, res, next) => {
  try {
    const { careerId } = req.params;
    const user = req.user;

    const progress = (user.skillProgress && user.skillProgress[careerId]) ? user.skillProgress[careerId] : {};
    return res.json({ success: true, data: { progress, careerId } });
  } catch (err) {
    next(err);
  }
};

// FR6: Reset all progress
const resetProgress = async (req, res, next) => {
  try {
    if (getIsMemoryMode()) {
      const idx = memoryStore.users.findIndex((u) => u._id === String(req.user._id));
      if (idx !== -1) {
        memoryStore.users[idx].skillProgress = {};
        memoryStore.users[idx].selectedCareer = '';
        memoryStore.users[idx].assessmentResults = null;
      }
      return res.json({ success: true, message: 'All data reset.' });
    }

    const User = require('../models/User');
    await User.findByIdAndUpdate(req.user._id, { skillProgress: {}, selectedCareer: '', assessmentResults: null });
    return res.json({ success: true, message: 'All data reset.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { updateProfile, updateSelectedCareer, updateSkillProgress, getProgress, resetProgress };
