/**
 * routes/transactionRoutes.js
 * Handles all transaction-related API routes.
 */

const express = require('express');
const { Transaction, getUserTransactions } = require('../models/Transaction');

const router = express.Router();

/**
 * POST /api/transactions/add
 * Adds a new transaction (income or expense) for a user.
 */
router.post('/add', async (req, res) => {
  try {
    const { userId, amount, category, type, date } = req.body;

    if (!userId || !amount || !category || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const transaction = await Transaction.create({
      userId,
      amount,
      category,
      type,
      date: date || new Date().toISOString()
    });

    res.status(201).json({ message: 'Transaction added', transaction });
  } catch (error) {
    console.error('💸 Add transaction error:', error);
    res.status(500).json({ error: 'Failed to add transaction' });
  }
});

/**
 * GET /api/transactions/:userId
 * Retrieves all transactions for a user.
 */
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const transactions = await getUserTransactions(userId);

    if (!Array.isArray(transactions)) {
      return res.status(500).json({ error: 'Expected array of transactions' });
    }

    res.json({ transactions: transactions.map(tx => tx.toObject()) });
  } catch (error) {
    console.error('📄 Fetch transactions error:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

module.exports = router;