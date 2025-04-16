// algorithms/smartBudgetingTipsAlgorithm.js
require('dotenv').config(); // Load environment variables

const fetch = require('node-fetch');

// Get OpenAI API key from .env file
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Generate 3 budgeting tips using OpenAI based on categorized spending data
async function getSmartBudgetingTips(spendingData) {
  const userPrompt = `Give 3 personalized budgeting tips based on this spending data:\n${JSON.stringify(spendingData, null, 2)}\nBe short and helpful.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful personal finance assistant.' },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 150
    })
  });

  const data = await response.json();
  console.log('🔎 OpenAI raw response:', JSON.stringify(data, null, 2));

  return data.choices?.[0]?.message?.content?.trim() || '⚠️ No response from OpenAI.';
}

module.exports = getSmartBudgetingTips;