const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signToken } = require('../middleware/auth');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    if (!phone && !email) return res.status(400).send('Phone or Email required');
    const existing = await User.findOne({ $or: [{ phone }, { email }] });
    if (existing) return res.status(400).send('User already exists');
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, phone, email, passwordHash });
    const token = signToken(user);
    res.cookie('token', token, { httpOnly: true, maxAge: 7*24*60*60*1000 });
    res.redirect('/game');
  } catch (e) {
    console.error(e);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { phoneOrEmail, password } = req.body;
    const user = await User.findOne({ $or: [{ phone: phoneOrEmail }, { email: phoneOrEmail }] });
    if (!user) return res.status(400).send('User not found');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).send('Invalid credentials');
    const token = signToken(user);
    res.cookie('token', token, { httpOnly: true, maxAge: 7*24*60*60*1000 });
    res.redirect('/game');
  } catch (e) {
    console.error(e);
    res.status(500).send('Server error');
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;
