/** 
 * backend/algorithms/rewardSystem.js
 * Calculates reward points based on user's financial behavior
*/
function calculateRewardPoints(budgetStatus, challengeComplete, streak) {
  let points = 0;
  if (budgetStatus === "under") points += 50;
  if (challengeComplete) points += 100;
  if (streak >= 5) points += 25;
  return points;
}

module.exports = calculateRewardPoints; 