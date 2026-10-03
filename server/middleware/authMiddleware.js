const jwt = require('jsonwebtoken');
const { getIsMemoryMode } = require('../config/db');

// In-memory user store for fallback mode
const memoryUsers = require('../config/memoryStore').users;

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorised, no token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'careerpath_dev_secret_2026');

    if (getIsMemoryMode()) {
      // Fallback: look up in memory store
      const user = memoryUsers.find((u) => u._id === decoded.id);
      if (!user) return res.status(401).json({ success: false, message: 'User not found.' });
      req.user = { ...user, password: undefined };
    } else {
      const User = require('../models/User');
      const user = await User.findById(decoded.id).select('-password');
      if (!user) return res.status(401).json({ success: false, message: 'User not found.' });
      req.user = user;
    }

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorised, invalid token.' });
  }
};

module.exports = { protect };
