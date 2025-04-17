const mongoose = require('mongoose');

// Budget schema for MongoDB
const budgetSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  limit: { type: Number, required: true },
  month: { type: String, required: true },
});

// Create model
const Budget = mongoose.model('Budget', budgetSchema);

// Helper function
function getUserBudgets(userId) {
  return Budget.find({ userId });
}

// Export both
module.exports = {
  Budget,
  getUserBudgets,
};
