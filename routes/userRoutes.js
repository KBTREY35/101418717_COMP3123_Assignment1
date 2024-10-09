const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Sign up
router.post('/signup', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const newUser = new User({ username, email, password });
  await newUser.save();
  res.status(201).json({ message: "User created successfully.", user_id: newUser._id });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.status(200).json({ message: "Login successful", token });
});

module.exports = router;
