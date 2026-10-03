require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ── Connect to DB ──
connectDB();

// ── Middleware ──
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ── Health check ──
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'CareerPath API is running.',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// ── Routes ──
app.use('/api/auth', require('./routes/auth'));
app.use('/api/careers', require('./routes/careers'));
app.use('/api/assessment', require('./routes/assessment'));
app.use('/api/profile', require('./routes/profile'));

// ── 404 ──
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found.` });
});

// ── Error handler ──
app.use(errorHandler);

// ── Start ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 CareerPath server running on http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
