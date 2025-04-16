// backend/routes/cryptoRoutes.js

const express = require('express');
const router = express.Router();
const convertUsdToBitcoin = require('../algorithms/cryptoChallengeAlgorithm');

// POST /api/crypto/convert
// Converts a given USD savings amount into BTC using CoinGecko API
router.post('/convert', async (req, res) => {
  try {
    const { usdAmount } = req.body;

    // Validate input
    if (!usdAmount || isNaN(usdAmount) || usdAmount <= 0) {
      return res.status(400).json({ error: 'Invalid USD amount' });
    }

    // Convert USD to BTC
    const btc = await convertUsdToBitcoin(usdAmount);

    res.status(200).json({
      usd: usdAmount,
      btc: btc.toFixed(8), // Round to 8 decimals (standard for BTC)
      message: `USD ${usdAmount} = BTC ${btc.toFixed(8)} (approx.)`,
    });
  } catch (err) {
    console.error('Error converting to BTC:', err);
    res.status(500).json({ error: 'Unable to fetch BTC conversion rate' });
  }
});

module.exports = router;