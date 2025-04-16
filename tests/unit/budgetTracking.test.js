// tests/unit/budgetTracking.test.js
const getSpendingStatus = require('../../algorithms/budgetTracking');

describe('Budget Tracking – FR-5', () => {
  it('calculates correct percentage spent and remaining budget', () => {
    const transactions = [
      { category: 'Groceries', amount: 40 },
      { category: 'Groceries', amount: 35 },
      { category: 'Dining', amount: 20 }
    ];

    const result = getSpendingStatus(transactions, 'Groceries', 100);

    expect(result.spent).toBe(75);
    expect(result.remaining).toBe(25);
    expect(result.percent).toBe(75); 
  });

  it('handles a budget of 0 (edge case)', () => {
    const result = getSpendingStatus([], 'Groceries', 0);
    expect(result.percent).toBe(0); // updated expectation
  });
});
