const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // make sure this path matches your folder structure

// ======================
// ✅ SIGNUP ROUTE
// ======================
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log('[SIGNUP]', fullName, email); // 👀 log what we’re getting

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use. Please log in.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('🔥 SIGNUP ERROR:', err); // 👈 THIS IS WHAT WE NEED
    res.status(500).json({ message: err.message || 'Server error' });
  }
});


// ======================
// ✅ LOGIN ROUTE
// ======================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', {
      expiresIn: '1d',
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
