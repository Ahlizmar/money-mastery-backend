/**
 * algorithms/budgetTracking.js
 * Calculates spending status for a specific budget category.
 * */ 
function getSpendingStatus(transactions, category, budgetLimit) {
  
  // Filter transactions that match the given category
  const spent = transactions
    .filter(tx => tx.category === category)
    .reduce((sum, tx) => sum + tx.amount, 0); // Sum up total spent in that category

  // Calculate remaining budget and percentage used
  const remaining = budgetLimit - spent;
  const percent = budgetLimit === 0 ? 0 : (spent / budgetLimit) * 100;

  return { spent, remaining, percent };
}

module.exports = getSpendingStatus;