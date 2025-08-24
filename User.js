const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  passwordHash: { type: String, required: true },
  coins: { type: Number, default: 100 },
  vipTier: { type: String, enum: ['none', 'bronze', 'gold'], default: 'none' },
  vipExpiry: { type: Date, default: null },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
