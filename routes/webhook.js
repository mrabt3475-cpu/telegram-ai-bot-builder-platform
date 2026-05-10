const express = require('express');
const router = express.Router();
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Telegram webhook endpoint
router.post('/telegram', bot.webhookCallback('/telegram'));

// Health check for webhook
router.get('/telegram/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Bot commands
bot.start((ctx) => {
  ctx.reply('👋 مرحباً بك! أنا مساعدك الذكي لإنشاء بوتات تيليغرام.');
});

bot.help((ctx) => {
  ctx.reply('استخدم الأمر /create لإنشاء بوت جديد باستخدام AI.');
});

bot.command('create', async (ctx) => {
  try {
    ctx.reply('🤖 جاري إنشاء بوتك الذكي...');
    // Here you would integrate with the AI bot generator
    await ctx.reply('✅ تم إنشاء البوت بنجاح! يمكنك الآن تخصيصه.');
  } catch (error) {
    ctx.reply('❌ حدث خطأ أثناء إنشاء البوت.');
  }
});

bot.command('mybots', async (ctx) => {
  try {
    // Here you would fetch user's bots from database
    await ctx.reply('📋 قائمة بوتاتك:');
  } catch (error) {
    ctx.reply('❌ حدث خطأ أثناء جلب قائمة البوتات.');
  }
});

module.exports = router;