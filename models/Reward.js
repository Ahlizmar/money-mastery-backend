/**
 * models/Reward.js
 * Mongoose schema for tracking user rewards
 */

const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['points', 'badge'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  dateEarned: {
    type: Date,
    default: Date.now
  }
});

const Reward = mongoose.model('Reward', rewardSchema);
module.exports = Reward;