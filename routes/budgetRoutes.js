//routes/budgetRoutes.js
const express = require('express');
const router = express.Router();

const { addBudget, getUserBudgets } = require('../models/Budget');
const { getUserTransactions } = require('../models/Transaction');
const getSpendingStatus = require('../algorithms/budgetTracking');

/**
 * POST /api/budget/add
 * Adds a new budget for a user in a specific category.
 * Expects: { userId, category, limit, month (optional) }
 */
router.post('/add', (req, res) => {
  const { userId, category, limit, month } = req.body;

  if (!userId || !category || typeof limit !== 'number') {
    return res.status(400).json({ error: 'userId, category, and limit are required' });
  }

  const budget = addBudget({ userId, category, limit, month });
  res.status(201).json({ message: 'Budget created', budget });
});

/**
 * GET /api/budget/:userId
 * Returns all budgets for the given user
 */
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const budgets = getUserBudgets(userId);
  res.json({ budgets });
});

/**
 * POST /api/budget/status
 * Returns spending status for a given category
 * Expects: { userId, category }
 */
router.post('/status', (req, res) => {
  const { userId, category } = req.body;

  if (!userId || !category) {
    return res.status(400).json({ error: 'userId and category are required' });
  }

  const budgets = getUserBudgets(userId);
  const budget = budgets.find(b => b.category === category);

  if (!budget) {
    return res.status(404).json({ error: 'No budget found for that category' });
  }

  const transactions = getUserTransactions(userId);
  const status = getSpendingStatus(transactions, category, budget.limit);

  res.json({
    category,
    limit: budget.limit,
    ...status
  });
});

module.exports = router;