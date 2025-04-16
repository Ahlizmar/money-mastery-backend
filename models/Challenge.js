/**
 * backend/models/Challenge.js
 * Mongoose schema for user challenges
 */

const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  goal: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed'],
    default: 'in-progress'
  },
  progress: {
    type: Number,
    default: 0
  },
  rewardPoints: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Challenge = mongoose.model('Challenge', challengeSchema);
module.exports = Challenge;