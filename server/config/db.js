const mongoose = require('mongoose');

// In-memory flag — only true when no valid MONGO_URI is provided
let isMemoryMode = false;

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri || uri.includes('<username>') || uri.trim() === '') {
    console.warn('⚠️  No valid MONGO_URI found. Running in memory fallback mode.');
    isMemoryMode = true;
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    });

    const dbName = conn.connection.db.databaseName;
    console.log(`✅ MongoDB Atlas Connected`);
    console.log(`   Host     : ${conn.connection.host}`);
    console.log(`   Database : ${dbName}`);
    console.log(`   State    : ${conn.connection.readyState === 1 ? 'connected' : 'unknown'}`);

    // Listen for disconnect events
    mongoose.connection.on('disconnected', () =>
      console.warn('⚠️  MongoDB disconnected')
    );
    mongoose.connection.on('error', (err) =>
      console.error('❌ MongoDB error:', err.message)
    );

    isMemoryMode = false;
  } catch (err) {
    console.error(`❌ MongoDB Atlas connection failed: ${err.message}`);
    console.warn('⚠️  Falling back to in-memory mode. Data will NOT persist across restarts.');
    isMemoryMode = true;
  }
};

const getIsMemoryMode = () => isMemoryMode;

module.exports = { connectDB, getIsMemoryMode };
