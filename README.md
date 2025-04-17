# Money Mastery – Backend

This is the backend API for the Money Mastery application, a personal finance tool that supports budgeting, transaction tracking, smart AI-based financial tips, and gamified rewards. The backend is built with Node.js, Express, MongoDB, and integrates external APIs such as OpenAI, CoinGecko, and NewsData.io.

## Features

- User registration and login
- Budget creation and tracking
- AI-generated smart budgeting tips
- Crypto savings progress via BTC conversion
- Financial news integration
- Mock transaction loader for testing
- Modular codebase using Express Router and Mongoose models
- Deployed on Render with MongoDB Atlas

## Live API Base URL

https://money-mastery-backend.onrender.com

## API Endpoints

User Authentication:
- POST /api/users/register – Register a new user
- POST /api/users/login – Authenticate user credentials

Budget Management:
- POST /api/budget/add – Add a new budget category
- POST /api/budget/status – Get percentage of budget used
- GET /api/budget/:userId – View all budget categories for a user

Smart Insights (AI):
- POST /api/insights – Generate budgeting tips using OpenAI based on spending data

Crypto Challenge:
- POST /api/crypto-challenge – Convert USD savings to Bitcoin equivalent and calculate goal progress

Financial News:
- GET /api/news – Get latest finance headlines using NewsData.io API

Mock Loader:
- GET /api/mock/load – Load test transactions into the database (development only)

## Installation Instructions

Prerequisites:
- Node.js (v18 or higher)
- MongoDB Atlas account
- OpenAI API key
- NewsData.io API key

1. Clone the repository:
git clone https://github.com/your-username/money-mastery-backend.git
cd money-mastery-backend

2. Install dependencies:
npm install

3. Add environment variables:
Create a .env file in the project root and include the following:

MONGODB_URI=your-mongodb-uri
OPENAI_API_KEY=your-openai-api-key
NEWSDATA_API_KEY=your-newsdata-api-key
PORT=3000

4. Run the server locally:
node app.js

Server will run on http://localhost:3000

## Project Structure

/algorithms           → Business logic (AI, forecasting, XP)
/models               → Mongoose schemas and helpers
/routes               → API endpoints for users, budget, insights
/mock                 → Sample transaction data for testing
/tests                → Unit and integration tests (Jest)
/.env.example         → Environment variable template
app.js                → Main Express server entry point

## Testing

This project uses Jest for testing core algorithms and routes.

To run all tests:
npm test

Test cases cover:
- Budget calculation
- Reward logic
- Savings forecast
- Route integration

## Deployment Notes

This backend is deployed using Render. Ensure the following are added to the Render service's Environment tab:

- MONGODB_URI
- OPENAI_API_KEY
- NEWSDATA_API_KEY

Start command:
node app.js

## Related Repositories

Frontend (React Native):  
https://github.com/your-username/money-mastery-frontend

## License

This codebase is used for academic purposes as part of the Software Engineering 1 course at Florida International University.
