const OpenAI = require('openai');
const Bot = require('../models/Bot');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateBotCode(botName, description, aiConfig) {
  const prompt = `
Generate a complete Telegram bot code using Telegraf.js based on the following requirements:

Bot Name: ${botName}
Description: ${description}
AI Model: ${aiConfig.model}
Temperature: ${aiConfig.temperature}
Max Tokens: ${aiConfig.maxTokens}

Include:
1. Bot setup with Telegraf
2. AI integration with OpenAI
3. Welcome message
4. Command handlers
5. Error handling
6. Configuration options

Return only the code without explanations.
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'user',
      content: prompt
    }],
    temperature: 0.7,
    max_tokens: 2000
  });

  return response.choices[0].message.content;
}

async function createBot(userId, botName, description, aiConfig) {
  try {
    // Generate bot code using AI
    const botCode = await generateBotCode(botName, description, aiConfig);

    // Create bot record in database
    const bot = new Bot({
      userId,
      botName,
      description,
      aiConfig,
      commands: []
    });
    await bot.save();

    return bot;
  } catch (error) {
    throw new Error('Failed to create bot: ' + error.message);
  }
}

module.exports = {
  generateBotCode,
  createBot
};