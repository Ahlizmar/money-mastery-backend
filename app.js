/**
 * backend/app.js
 * Main entry point for the Money Mastery backend server.
 * Connects to MongoDB, loads routes, and starts the Express server.
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

// Global Middleware
app.use(cors());
app.use(express.json());

// Route Imports
const mockRoutes = require('./routes/mockRoutes');             // Development-only route
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const challengeRoutes = require('./routes/challengeRoutes');
const insightsRoutes = require('./routes/insightsRoutes');
const forecastRoutes = require('./routes/forecastRoutes');
const newsRoutes = require('./routes/newsRoutes');

// Route Mounting
console.log('🧪 Mounting /api/mock route...');
app.use('/api/mock', mockRoutes);                              // Dev: load mock data

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/insights', insightsRoutes);
app.use('/api/forecast', forecastRoutes);
app.use('/api/news', newsRoutes);

// Root Health Check
app.get('/', (req, res) => {
  res.send('✅ Money Mastery API is running');
});

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});