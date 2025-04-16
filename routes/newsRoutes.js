//routes/newsRoutes.js
const express = require('express');
const getFinanceNews = require('../algorithms/newsFeed');

const router = express.Router();

/**
 * GET /api/news
 * Returns a list of 3–5 recent personal finance news articles.
 */
router.get('/', async (req, res) => {
  try {
    // Call the algorithm that fetches finance headlines
    const articles = await getFinanceNews();

    res.json({ articles });
  } catch (error) {
    console.error('📰 News fetch error:', error);
    res.status(500).json({ error: 'Unable to retrieve finance news.' });
  }
});

module.exports = router;