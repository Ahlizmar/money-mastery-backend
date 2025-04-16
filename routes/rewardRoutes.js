//routes/rewardRoutes.js
const express = require('express');
const { calculateRewardPoints } = require('../algorithms/rewardSystem');
const { addReward, getUserRewards } = require('../models/Reward');

const router = express.Router();

/**
 * POST /api/rewards/update
 * Calculates and stores new reward points for a user.
 * Expects:
 * {
 *   userId: string,
 *   budgetStatus: "under" | "over",
 *   challengeComplete: boolean,
 *   streak: number
 * }
 */
router.post('/update', (req, res) => {
  try {
    const { userId, budgetStatus, challengeComplete, streak } = req.body;

    // Validate input
    if (!userId || typeof budgetStatus !== 'string') {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Calculate reward points using the algorithm
    const points = calculateRewardPoints(budgetStatus, challengeComplete, streak);

    // Store the reward
    const reward = addReward({
      userId,
      type: 'points',
      description: `+${points} pts — ${budgetStatus} budget${challengeComplete ? ', challenge complete' : ''}`,
      points
    });

    res.json({ message: 'Reward recorded', reward });
  } catch (error) {
    console.error('🏆 Reward update error:', error);
    res.status(500).json({ error: 'Failed to update rewards' });
  }
});

/**
 * GET /api/rewards/:userId
 * Fetches all rewards earned by a user
 */
router.get('/:userId', (req, res) => {
  try {
    const userId = req.params.userId;
    const rewards = getUserRewards(userId);

    res.json({ rewards });
  } catch (error) {
    console.error('🏅 Fetch rewards error:', error);
    res.status(500).json({ error: 'Failed to fetch rewards' });
  }
});

module.exports = router;