const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  category: String,
  type: { type: String, enum: ['income', 'expense'] },
  date: Date
});

const Transaction = mongoose.model('Transaction', transactionSchema);

function getUserTransactions(userId) {
  return Transaction.find({ userId });
}

module.exports = {
  Transaction,
  getUserTransactions
};