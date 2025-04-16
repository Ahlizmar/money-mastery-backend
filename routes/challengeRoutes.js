//routes/challengeRoutes.js
const express = require('express');
const router = express.Router();
const { 
  createChallenge, 
  getUserChallenges, 
  updateChallengeProgress, 
  completeChallenge 
} = require('../models/Challenge');
const { calculateRewardPoints } = require('../algorithms/rewardSystem');

// Create a new challenge
router.post('/create', (req, res) => {
  const { userId, goal } = req.body;

  if (!userId || !goal) {
    return res.status(400).json({ error: 'userId and goal are required' });
  }

  const newChallenge = createChallenge({ userId, goal });
  res.status(201).json({ message: 'Challenge created', challenge: newChallenge });
});

// Get all challenges for a user
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const challenges = getUserChallenges(userId);
  res.json(challenges);
});

// Update challenge progress
router.put('/progress/:challengeId', (req, res) => {
  const { challengeId } = req.params;
  const { progress } = req.body;

  if (typeof progress !== 'number') {
    return res.status(400).json({ error: 'Progress must be a number' });
  }

  const updated = updateChallengeProgress(challengeId, progress);
  if (!updated) {
    return res.status(404).json({ error: 'Challenge not found' });
  }

  res.json({ message: 'Progress updated', challenge: updated });
});

// Mark challenge as complete and award points
router.post('/complete/:challengeId', (req, res) => {
  const { challengeId } = req.params;
  const challenge = completeChallenge(challengeId);

  if (!challenge) {
    return res.status(404).json({ error: 'Challenge not found' });
  }

  // Calculate reward points based on challenge completion
  const points = calculateRewardPoints({
    budgetStatus: 'under', // default assumption
    challengeComplete: true,
    streak: 0 // optional extension
  });

  challenge.rewardPoints = points;

  res.json({ 
    message: 'Challenge completed and reward applied', 
    challenge 
  });
});

module.exports = router;