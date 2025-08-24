const mongoose = require('mongoose');
const WalletTx = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['add', 'deduct'], required: true },
  coins: { type: Number, required: true },
  note: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('WalletTx', WalletTx);
