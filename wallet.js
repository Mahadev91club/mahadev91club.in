const express = require('express');
const User = require('../models/User');
const WalletTx = require('../models/WalletTx');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/me', requireAuth, async (req, res) => {
  res.json({ coins: req.user.coins, vipTier: req.user.vipTier, vipExpiry: req.user.vipExpiry });
});

router.post('/add', requireAuth, async (req, res) => {
  const { coins = 100 } = req.body;
  req.user.coins += Number(coins);
  await req.user.save();
  await WalletTx.create({ userId: req.user._id, type: 'add', coins, note: 'bonus' });
  res.json({ success: true, coins: req.user.coins });
});

module.exports = router;
