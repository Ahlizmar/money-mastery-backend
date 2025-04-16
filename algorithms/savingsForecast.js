/**
 * algorithms/savingsForecast.js
 * This function estimates end-of-month savings based on current spending rate
 */
function calculateForecast(totalSpent, monthlyIncome, currentDay, daysInMonth) {
  const avgDailySpend = totalSpent / currentDay;
  const projectedSpending = avgDailySpend * daysInMonth;
  const projectedSavings = monthlyIncome - projectedSpending;

  return {
    projectedSpending: parseFloat(projectedSpending.toFixed(2)),
    projectedSavings: parseFloat(projectedSavings.toFixed(2)),
    status: projectedSavings >= 0 ? 'on track' : 'overspending'
  };
}

module.exports = calculateForecast;