require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Telegram AI Bot Builder Platform API' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Telegram Bot Routes
bot.start((ctx) => ctx.reply('👋 مرحباً بك! أنا مساعدك الذكي لإنشاء بوتات تيليغرام.'));
bot.help((ctx) => ctx.reply('استخدم الأمر /create لإنشاء بوت جديد باستخدام AI.'));

bot.command('create', async (ctx) => {
  try {
    ctx.reply('🤖 جاري إنشاء بوتك الذكي...');
    // Here you would integrate with OpenAI to generate bot code
    await ctx.reply('✅ تم إنشاء البوت بنجاح! يمكنك الآن تخصيصه.');
  } catch (error) {
    ctx.reply('❌ حدث خطأ أثناء إنشاء البوت.');
  }
});

// Start bot
bot.launch()
  .then(() => console.log('✅ Telegram bot started'))
  .catch(err => console.error('❌ Telegram bot error:', err));

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
});

// Graceful shutdown
process.on('SIGINT', () => bot.stop('SIGINT'));
process.on('SIGTERM', () => bot.stop('SIGTERM'));