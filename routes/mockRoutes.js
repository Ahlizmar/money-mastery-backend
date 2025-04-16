/**
 * routes/mockRoutes.js
 * Route to populate MongoDB database with fake/sample data
 */
const express = require('express');
const path = require('path');
const fs = require('fs');

const User = require('../models/User');
const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');
const Challenge = require('../models/Challenge');
const Reward = require('../models/Reward');

console.log('📦 mockRoutes.js loaded');

const router = express.Router();

// ✅ Quick test route
router.get('/test', (req, res) => {
  console.log('🔥 /api/mock/test route hit');
  res.send('✅ /api/mock/test route is working');
});

// ✅ Load ALL mock data
router.get('/loadAll', async (req, res) => {
  console.log('🔥 /api/mock/loadAll route hit');

  try {
    const base = path.join(__dirname, '../mock');

    const users = JSON.parse(fs.readFileSync(path.join(base, 'mockUsers.json'), 'utf-8'));
    const budgets = JSON.parse(fs.readFileSync(path.join(base, 'mockBudgets.json'), 'utf-8'));
    const transactions = JSON.parse(fs.readFileSync(path.join(base, 'mockTransactions.json'), 'utf-8'));
    const challenges = JSON.parse(fs.readFileSync(path.join(base, 'mockChallenges.json'), 'utf-8'));
    const rewards = JSON.parse(fs.readFileSync(path.join(base, 'mockRewards.json'), 'utf-8'));

    // Clear existing collections 
    await User.deleteMany({});
    await Budget.deleteMany({});
    await Transaction.deleteMany({});
    await Challenge.deleteMany({});
    await Reward.deleteMany({});

    // Insert data
    await User.insertMany(users);
    await Budget.insertMany(budgets);
    await Transaction.insertMany(transactions);
    await Challenge.insertMany(challenges);
    await Reward.insertMany(rewards);

    res.json({ message: '✅ All mock data loaded into MongoDB.' });
  } catch (error) {
    console.error('❌ Failed to load mock data:', error);
    res.status(500).json({ error: 'Failed to load some or all mock data.' });
  }
});

module.exports = router;