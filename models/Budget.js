const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: String,
  category: String,
  limit: Number,
  month: String,
});

const Budget = mongoose.model('Budget', budgetSchema);

function getUserBudgets(userId) {
  return Budget.find({ userId });
}

module.exports = {
  Budget,
  getUserBudgets,
};
