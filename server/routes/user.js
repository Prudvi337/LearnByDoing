// routes/user.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const authenticate = require('../middleware/authenticate'); // Middleware for authentication

// Get user profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const userId = req.user.id; // Assume req.user is populated by your authentication middleware
    const user = await User.findById(userId).populate('projects.projectId', 'title'); // Populate project title

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user data without sensitive information
    const { username, email, projects } = user;
    res.json({ username, email, projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
