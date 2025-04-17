// routes/budgetRoutes.js
const express = require('express');
const router = express.Router();

const { Budget, getUserBudgets } = require('../models/Budget'); // Mongoose model + helper
const { Transaction } = require('../models/Transaction'); // Mongoose model
const getSpendingStatus = require('../algorithms/budgetTracking');

/**
 * POST /api/budget/add
 * Adds a new budget for a user in a specific category.
 * Expects: { userId, category, limit, month (optional) }
 */
router.post('/add', async (req, res) => {
  const { userId, category, limit, month } = req.body;

  if (!userId || !category || typeof limit !== 'number') {
    return res.status(400).json({ error: 'userId, category, and limit are required' });
  }

  try {
    const budget = new Budget({ userId, category, limit, month });
    await budget.save();
    res.status(201).json({ message: 'Budget created', budget });
  } catch (err) {
    console.error('Error creating budget:', err.message);
    res.status(500).json({ error: 'Failed to save budget' });
  }
});

/**
 * GET /api/budget/:userId
 * Returns all budgets for the given user
 */
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const budgets = await getUserBudgets(userId); // use helper function
    res.json({ budgets });
  } catch (err) {
    console.error('Error loading budgets:', err.message);
    res.status(500).json({ error: 'Failed to load budgets' });
  }
});

/**
 * POST /api/budget/status
 * Returns spending status for a given category
 * Expects: { userId, category }
 */
router.post('/status', async (req, res) => {
  const { userId, category } = req.body;

  if (!userId || !category) {
    return res.status(400).json({ error: 'userId and category are required' });
  }

  try {
    const budgets = await getUserBudgets(userId);
    const budget = budgets.find(b => b.category === category);

    if (!budget) {
      return res.status(404).json({ error: 'No budget found for that category' });
    }

    const transactions = await Transaction.find({ userId, category });
    const status = getSpendingStatus(transactions, category, budget.limit);

    res.json({
      category,
      limit: budget.limit,
      ...status
    });
  } catch (err) {
    console.error('Error in budget/status route:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
