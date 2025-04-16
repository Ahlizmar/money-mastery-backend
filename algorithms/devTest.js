// test.js — Run with: node algorithms/test.js

// 1. FR-5 / SDD 5.1: Budget Tracking
const getSpendingStatus = require('./budgetTracking');
const transactions = [
  { category: 'Groceries', amount: 40 },
  { category: 'Groceries', amount: 35 },
  { category: 'Dining', amount: 20 },
];
console.log('\n🧮 FR-5: Budget Tracking Algorithm');
console.log(getSpendingStatus(transactions, 'Groceries', 100));

// 2. FR-9 / SDD 5.2: Savings Forecast
const forecastSavings = require('./savingsForecast');
console.log('\n💰 FR-9: Savings Forecast Algorithm');
console.log(forecastSavings(300, 1200, 10, 30));

// 3. FR-8 / SDD 5.3: Smart Budgeting Tips (OpenAI)
const getSmartBudgetingTips = require('./smartBudgetingTipsAlgorithm');
console.log('\n🤖 FR-8: Smart Budgeting Tips (OpenAI)');
const sampleSpending = {
  Groceries: 320,
  Dining: 180,
  Entertainment: 150,
  Subscriptions: 95,
};
getSmartBudgetingTips(sampleSpending).then(tips => {
  console.log(tips);
});

// 4. Crypto Challenge / SDD 5.4
const getCryptoEquivalent = require('./cryptoChallenge');
console.log('\n₿ Crypto Challenge (Bitcoin equivalent of $50)');
getCryptoEquivalent(50).then(result =>
  console.log(`${result.toFixed(6)} BTC`)
);

// 5. FR-6 / FR-7 / SDD 5.5: Reward System
const calculateRewards = require('./rewardSystem');
console.log('\n🏆 FR-6/FR-7: Reward System');
console.log(calculateRewards('under', true, 6));

// 6. Onboarding / SDD 5.6: Email Validation (Abstract API)
const isValidEmail = require('./emailValidation');
console.log('\n📧 Onboarding: Email Validation (abstractapi.com)');
isValidEmail('aidasimon9@gmail.com').then(result =>
  console.log('Valid email:', result)
);

// 7. Insights Panel / SDD 5.7: Finance News Feed (NewsData.io)
const getFinanceNews = require('./newsFeed');
console.log('\n📰 Insights Panel: Finance News Feed');
getFinanceNews().then(news =>
  news.forEach((n, i) => console.log(`${i + 1}. ${n.title}`))
);

// 8. FR-4 Alt Flow / SDD 5.8: Simulated Transactions Loader
const loadMockTransactions = require('./simulateTransactions');
console.log('\n🧾 FR-4: Simulated Transactions (for testing)');
try {
  const mockTx = loadMockTransactions('./mock/transactions.json');
  console.log(mockTx);
} catch (err) {
  console.log('⚠️ No mock transaction file found at /mock/transactions.json.');
}