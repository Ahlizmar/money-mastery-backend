// tests/unit/savingsForecast.test.js
const calculateForecast = require('../../algorithms/savingsForecast');

describe('Savings Forecast – FR-9', () => {
  it('returns projected savings and status correctly', () => {
    const result = calculateForecast(300, 1200, 10, 30);

    expect(result.projectedSpending).toBeCloseTo(900);
    expect(result.projectedSavings).toBeCloseTo(300);
    expect(result.status).toBe('on track');
  });

  it('returns overspending status when forecast goes negative', () => {
    const result = calculateForecast(900, 1000, 10, 30);
    expect(result.status).toBe('overspending');
  });
});