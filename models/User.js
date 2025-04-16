/**
 * models/User.js
 * Mongoose schema and helper functions for user accounts.
 */

const mongoose = require('mongoose');

// Define user schema for MongoDB
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// 🔍 Helper: find a user by email
function findUserByEmail(email) {
  return User.findOne({ email });
}

// 🔍 Helper: find a user by ID
function findUserById(userId) {
  return User.findById(userId);
}

// Export the model and helpers
module.exports = {
  User,
  findUserByEmail,
  findUserById
};