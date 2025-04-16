// tests/integration/users.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../../routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Routes Integration – /api/users', () => {
  it('registers a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testUser',
        email: `user${Date.now()}@example.com`,
        password: 'test1234'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('email');
  });

  it('rejects duplicate email registration', async () => {
    const email = `dupe${Date.now()}@example.com`;
    const user = {
      username: 'duplicateUser',
      email,
      password: 'test1234'
    };

    await request(app).post('/api/users/register').send(user);
    const res = await request(app).post('/api/users/register').send(user);
    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('error');
  });

  it('logs in with valid credentials', async () => {
    const email = `login${Date.now()}@example.com`;
    const user = {
      username: 'loginUser',
      email,
      password: 'test1234'
    };

    await request(app).post('/api/users/register').send(user);
    const res = await request(app)
      .post('/api/users/login')
      .send({ email, password: 'test1234' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
  }, 10000);
});
