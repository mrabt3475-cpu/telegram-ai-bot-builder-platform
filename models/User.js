const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  telegramId: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true
  },
  firstName: String,
  lastName: String,
  credits: {
    type: Number,
    default: 10
  },
  referralCode: {
    type: String,
    unique: true
  },
  referredBy: {
    type: String,
    ref: 'User'
  },
  referralCount: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
});

// Hash referral code before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('referralCode')) {
    this.referralCode = await bcrypt.hash(this.referralCode, 10);
  }
  next();
});

// Method to verify referral code
userSchema.methods.verifyReferralCode = async function(code) {
  return await bcrypt.compare(code, this.referralCode);
};

module.exports = mongoose.model('User', userSchema);