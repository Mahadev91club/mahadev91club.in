const express = require('express');
const { requireAdmin } = require('../middleware/auth');
const User = require('../models/User');
const WalletTx = require('../models/WalletTx');
const router = express.Router();

router.get('/users', requireAdmin, async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).lean();
  res.render('admin/users', { title: 'Admin: Users', users });
});

router.post('/users/:id/add-coins', requireAdmin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('Not found');
  const coins = Number(req.body.coins || 0);
  user.coins += coins;
  await user.save();
  await WalletTx.create({ userId: user._id, type: 'add', coins, note: 'admin top-up' });
  res.redirect('/admin/users');
});

module.exports = router;
