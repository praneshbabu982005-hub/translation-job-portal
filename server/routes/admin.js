const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const User = require('../models/User');

// Example: Get all users (admin only)
router.get('/users', auth, requireRole('admin'), async (req, res) => {
  const users = await User.find({}, '-password');
  res.json(users);
});


// Dashboard stats
router.get('/stats', auth, requireRole('admin'), async (req, res) => {
  const User = require('../models/User');
  const Job = require('../models/Job');
  const userCount = await User.countDocuments();
  const jobs = await Job.find();
  const jobCount = jobs.length;
  const applicationCount = jobs.reduce((acc, job) => acc + (job.applicants ? job.applicants.length : 0), 0);
  res.json({ userCount, jobCount, applicationCount });
});

module.exports = router;
