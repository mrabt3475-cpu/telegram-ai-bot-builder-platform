const mongoose = require('mongoose');

const botSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  botName: {
    type: String,
    required: true
  },
  botToken: {
    type: String,
    required: true
  },
  description: String,
  commands: [{
    name: String,
    description: String,
    handler: String
  }],
  settings: {
    welcomeMessage: String,
    language: String,
    timezone: String
  },
  aiConfig: {
    model: String,
    temperature: Number,
    maxTokens: Number
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

botSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Bot', botSchema);