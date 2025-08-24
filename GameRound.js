const mongoose = require('mongoose');
const GameRound = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  game: { type: String, default: 'color' },
  choice: { type: String },
  result: { type: String },
  betCoins: { type: Number, default: 0 },
  coinsWon: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('GameRound', GameRound);
