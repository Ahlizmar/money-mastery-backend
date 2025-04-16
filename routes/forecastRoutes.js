//routes/forecastRoutes.js
const express = require('express');
const { calculateForecast } = require('../algorithms/savingsForecast');

const router = express.Router();

/**
 * POST /api/forecast
 * Expects:
 * {
 *   totalSpent: number,
 *   monthlyIncome: number,
 *   currentDay: number,   // e.g., 15
 *   daysInMonth: number   // e.g., 30 or 31
 * }
 * Returns projected savings at end of month
 */
router.post('/', (req, res) => {
  try {
    const { totalSpent, monthlyIncome, currentDay, daysInMonth } = req.body;

    // Basic validation
    if (
      typeof totalSpent !== 'number' ||
      typeof monthlyIncome !== 'number' ||
      typeof currentDay !== 'number' ||
      typeof daysInMonth !== 'number'
    ) {
      return res.status(400).json({ error: 'Invalid input types' });
    }

    // Make sure day values are realistic
    if (currentDay < 1 || currentDay > daysInMonth) {
      return res.status(400).json({ error: 'Invalid calendar day' });
    }

    // Calculate forecast
    const forecast = calculateForecast(totalSpent, monthlyIncome, currentDay, daysInMonth);

    res.json(forecast);
  } catch (err) {
    console.error('Forecast Error:', err);
    res.status(500).json({ error: 'Server error while calculating forecast' });
  }
});

module.exports = router;