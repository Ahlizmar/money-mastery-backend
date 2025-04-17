//routes/insightsRoutes.js
const express = require('express');
const generateSmartTips = require('../algorithms/smartBudgetingTipsAlgorithm');
const router = express.Router();

/**
 * POST /api/insights
 * Expects:
 * {
 *   spendingData: {
 *     groceries: number,
 *     dining: number,
 *     entertainment: number,
 *     etc...
 *   }
 * }
 * Returns 3 AI-generated budgeting tips
 */
router.post('/', async (req, res) => {
  const { spendingData } = req.body;
  
    // Check if spendingData object is provided
    if (!spendingData) {
      return res.status(400).json({ error: 'Missing spending data' });
    }

    // Call the smartTips algorithm to get AI suggestions
    try {
      const tips = await generateSmartTips(spendingData);
      res.json({ tips });
    } catch (err) {
      console.error('Insights Error:', err.message);
      res.status(500).json({ error: 'Server error while generating insights' });
    }
  });

module.exports = router;
