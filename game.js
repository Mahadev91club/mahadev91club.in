const express = require('express');
const { requireAuth } = require('../middleware/auth');
const GameRound = require('../models/GameRound');
const router = express.Router();

function randColor(){
  const arr = ['red','green','violet'];
  return arr[Math.floor(Math.random()*arr.length)];
}
function isVIPActive(user){
  return user.vipExpiry && new Date(user.vipExpiry) > new Date();
}
router.post('/play', requireAuth, async (req, res) => {
  try{
    const { choice, betCoins } = req.body;
    const bet = Math.max(1, parseInt(betCoins||0,10));
    if (req.user.coins < bet) return res.status(400).json({ error: 'Insufficient coins' });
    req.user.coins -= bet;
    const result = randColor();
    let coinsWon = 0;
    if (choice === result){
      const base = Math.floor(bet * 1.95);
      coinsWon = base;
      if (isVIPActive(req.user)){
        coinsWon = req.user.vipTier === 'gold' ? Math.floor(base * 1.2) : Math.floor(base * 1.1);
      }
      req.user.coins += coinsWon;
    }
    await req.user.save();
    const round = await GameRound.create({ userId: req.user._id, choice, result, betCoins: bet, coinsWon });
    res.json({ success: true, result, coinsWon, currentCoins: req.user.coins, roundId: round._id });
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
