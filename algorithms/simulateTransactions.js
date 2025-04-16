// algorithms/simulateTransactions.js
const fs = require('fs');

function loadMockTransactions(filePath) {
  const raw = fs.readFileSync(filePath);
  return JSON.parse(raw);
}

module.exports = loadMockTransactions;
