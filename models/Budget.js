/**
 * models/Budget.js
 * Mongoose schema for user budgets.
 */

const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  limit: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true // e.g., "2025-04"
  }
});

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;