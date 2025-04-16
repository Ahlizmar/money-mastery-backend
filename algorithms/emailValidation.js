/** 
 * algorithms/emailValidation.js
 * Load environment variables from .env file
*/
require('dotenv').config();

// If you're using Node.js without global fetch, uncomment this:
// const fetch = require('node-fetch'); 

// Load your Abstract API key from environment
const ABSTRACT_API_KEY = process.env.ABSTRACT_API_KEY;

/**
 * Checks if the provided email is in a valid format
 * using the Abstract Email Validation API.
 *
 * @param {string} email - The user's email to validate
 * @returns {Promise<boolean>} - True if valid format, false otherwise
 */
async function isValidEmail(email) {
  // Build request URL for Abstract API
  const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&email=${email}`;

  // Send request to Abstract API
  const response = await fetch(url);

  // Parse response data
  const data = await response.json();

  // Return true if email has a valid format, otherwise false
  return data.is_valid_format?.value || false;
}

module.exports = isValidEmail;
