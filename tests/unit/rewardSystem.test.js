// tests/unit/rewardSystem.test.js
const calculateRewardPoints = require('../../algorithms/rewardSystem');

describe('Reward System – FR-6 / FR-7', () => {
  it('awards 175 points for under budget, challenge complete, and 6-day streak', () => {
    const result = calculateRewardPoints('under', true, 6);
    expect(result).toBe(175);
  });

  it('awards 50 points for under budget only', () => {
    const result = calculateRewardPoints('under', false, 0);
    expect(result).toBe(50);
  });

  it('awards 0 points for over budget and no challenge', () => {
    const result = calculateRewardPoints('over', false, 0);
    expect(result).toBe(0);
  });
});