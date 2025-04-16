/**
 * config/db.js
 * Handles MongoDB connection
 */
const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the URI in your .env file.
 * Updated to remove deprecated options as of Mongoose v6+
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Exit app if DB connection fails
  }
};

module.exports = connectDB;