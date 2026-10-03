const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getIsMemoryMode } = require('../config/db');
const memoryStore = require('../config/memoryStore');

const JWT_SECRET = process.env.JWT_SECRET || 'careerpath_dev_secret_2026';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

// Helper: sanitise user for response
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

// ─────────────── REGISTER ───────────────
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    if (getIsMemoryMode()) {
      const exists = memoryStore.users.find((u) => u.email === email.toLowerCase().trim());
      if (exists) {
        return res.status(409).json({ success: false, message: 'Email already registered.' });
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const newUser = {
        _id: String(memoryStore.nextId++),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashed,
        profile: { degree: '', branch: '', currentYear: '', skills: [], interests: [], experienceLevel: '', preferredCareerArea: '' },
        assessmentResults: null,
        selectedCareer: '',
        skillProgress: {},
        createdAt: new Date().toISOString(),
      };
      memoryStore.users.push(newUser);
      const token = generateToken(newUser._id);
      return res.status(201).json({ success: true, message: 'Account created successfully.', data: { user: sanitise(newUser), token } });
    }

    // MongoDB mode
    const User = require('../models/User');
    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) {
      return res.status(409).json({ success: false, message: 'Email already registered.' });
    }
    const user = await User.create({ name: name.trim(), email: email.toLowerCase().trim(), password });
    const token = generateToken(user._id);
    return res.status(201).json({ success: true, message: 'Account created successfully.', data: { user: sanitise(user), token } });
  } catch (err) {
    next(err);
  }
};

// ─────────────── LOGIN ───────────────
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    if (getIsMemoryMode()) {
      const user = memoryStore.users.find((u) => u.email === email.toLowerCase().trim());
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }
      const token = generateToken(user._id);
      return res.json({ success: true, message: 'Login successful.', data: { user: sanitise(user), token } });
    }

    const User = require('../models/User');
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    const token = generateToken(user._id);
    return res.json({ success: true, message: 'Login successful.', data: { user: sanitise(user), token } });
  } catch (err) {
    next(err);
  }
};

// ─────────────── GET ME ───────────────
const getMe = async (req, res, next) => {
  try {
    res.json({ success: true, data: { user: sanitise(req.user) } });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getMe };
