/**
 * routes/userRoutes.js
 * Handles user registration and login with validation and password hashing.
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const isValidEmail = require('../algorithms/emailValidation'); // Email validation via Abstract API
const { User } = require('../models/User'); // Mongoose User model

const router = express.Router();

// ✅ Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // In test mode, skip email API validation for speed
    const isTest = process.env.NODE_ENV === 'test';
    if (!isTest) {
      const isValid = await isValidEmail(email);
      if (!isValid) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// ✅ Log in a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user || !user.passwordHash) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;