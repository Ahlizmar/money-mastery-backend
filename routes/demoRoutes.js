//routes/demoRoutes.js
const express = require('express');
const { loadMockTransactions } = require('../algorithms/simulateTransactions');

const router = express.Router();

// GET: Load mock transactions from a local JSON file
router.get('/load-mock-transactions', (req, res) => {
  try {
    // Load transactions from /mock/transactions.json
    const mockData = loadMockTransactions('./backend/mock/transactions.json');

    // Return the data to the frontend or testing tool
    res.status(200).json({
      message: 'Mock transactions loaded successfully',
      transactions: mockData,
    });
  } catch (err) {
    console.error('Failed to load mock transactions:', err);
    res.status(500).json({ error: 'Unable to load mock data' });
  }
});

module.exports = router;