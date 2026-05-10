const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Bot = require('../models/Bot');
const { verifyToken } = require('../middleware/auth');

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      id: user._id,
      username: user.username,
      credits: user.credits,
      referralCode: user.referralCode,
      referralCount: user.referralCount,
      totalEarnings: user.totalEarnings
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user bots
router.get('/bots', verifyToken, async (req, res) => {
  try {
    const bots = await Bot.find({ userId: req.user.id });
    res.json(bots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new bot
router.post('/bots', verifyToken, async (req, res) => {
  try {
    const { botName, description, aiConfig } = req.body;
    const bot = new Bot({
      userId: req.user.id,
      botName,
      description,
      aiConfig
    });
    await bot.save();
    res.status(201).json(bot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update bot
router.put('/bots/:id', verifyToken, async (req, res) => {
  try {
    const bot = await Bot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!bot) {
      return res.status(404).json({ error: 'Bot not found' });
    }
    res.json(bot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete bot
router.delete('/bots/:id', verifyToken, async (req, res) => {
  try {
    const bot = await Bot.findByIdAndDelete(req.params.id);
    if (!bot) {
      return res.status(404).json({ error: 'Bot not found' });
    }
    res.json({ message: 'Bot deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;