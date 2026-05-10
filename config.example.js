require('dotenv').config();

module.exports = {
  // Server configuration
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Telegram Bot Configuration
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
  TELEGRAM_WEBHOOK_URL: process.env.TELEGRAM_WEBHOOK_URL || '',

  // OpenAI Configuration
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-4',

  // Database Configuration
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/telegram-bot-builder',

  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // Credits System
  FREE_CREDITS: parseInt(process.env.FREE_CREDITS) || 10,
  CREDIT_COST_PER_REQUEST: parseInt(process.env.CREDIT_COST_PER_REQUEST) || 1,

  // Referral System
  REFERRAL_BONUS: parseInt(process.env.REFERRAL_BONUS) || 5,
  REFERRAL_EARNING: parseInt(process.env.REFERRAL_EARNING) || 2,

  // Telegram Login Widget
  TELEGRAM_LOGIN_URL: process.env.TELEGRAM_LOGIN_URL || 'https://t.me/your-bot',
  TELEGRAM_LOGIN_BOT_NAME: process.env.TELEGRAM_LOGIN_BOT_NAME || 'your_bot_name',

  // Rate Limiting
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW) || 60000,

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',

  // Payment (if using external payment gateway)
  PAYMENT_API_KEY: process.env.PAYMENT_API_KEY || '',
  PAYMENT_API_URL: process.env.PAYMENT_API_URL || '',
};