const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// ✅ Auth middleware to verify token
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // same as in login route
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// ✅ Protected dashboard route
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({
    message: `Welcome back, user ${req.user.userId}!`,
  });
});

module.exports = router;
