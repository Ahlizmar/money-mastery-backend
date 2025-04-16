// algorithms/cryptoChallengeAlgorithm.js
// Import node-fetch to make HTTP requests
const fetch = require('node-fetch');

// Converts a given USD amount into its Bitcoin (BTC) equivalent
async function convertUsdToBitcoin(usdAmount) {
  // Fetch the current Bitcoin price in USD from CoinGecko API
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
  const data = await response.json();

  // Extract the BTC price from the API response
  const price = data.bitcoin.usd;

  // Divide USD by the BTC price to get the BTC amount
  return usdAmount / price;
}

// Export the function so it can be used in route files
module.exports = convertUsdToBitcoin;