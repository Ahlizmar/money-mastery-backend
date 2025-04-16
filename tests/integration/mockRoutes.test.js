// tests/integration/mockRoutes.test.js
const request = require('supertest');
const express = require('express');
const mockRoutes = require('../../routes/mockRoutes');

const app = express();
app.use('/api/mock', mockRoutes);

describe('Mock Routes Integration – /api/mock', () => {
  it('responds to /test with confirmation message', async () => {
    const res = await request(app).get('/api/mock/test');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('✅');
  });
});