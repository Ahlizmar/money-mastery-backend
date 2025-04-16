// integration/transactions.test.js
require('dotenv').config();
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const transactionRoutes = require('../../routes/transactionRoutes');

const app = express();
app.use(express.json());
app.use('/api/transactions', transactionRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Transactions API – /api/transactions', () => {
  it('returns transactions for user u123', async () => {
    const res = await request(app).get('/api/transactions/u123');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.transactions)).toBe(true);
  });

  it('returns empty array for unknown user', async () => {
    const res = await request(app).get('/api/transactions/nonexistent');
    expect(res.statusCode).toBe(200);
    expect(res.body.transactions).toEqual([]);
  });
});