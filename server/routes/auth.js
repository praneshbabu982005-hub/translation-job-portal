const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';


// Register (user or admin)
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User already exists' });
  // Only allow admin registration if role is 'admin' and no admin exists yet
  if (role === 'admin') {
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) return res.status(403).json({ message: 'Admin already exists' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed, role: role === 'admin' ? 'admin' : 'user' });
  await user.save();
  res.status(201).json({ message: 'User registered', role: user.role });
});


// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, role: user.role });
});


// Get current user info
const auth = require('../middleware/auth');
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

module.exports = router;
