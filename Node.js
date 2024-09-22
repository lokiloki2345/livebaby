const TelegramBot = require('node-telegram-bot-api');

// Your Telegram bot token from BotFather
const token = '7405564681:AAF22C6f7yuVBYmoXPtOxaqAg_7A29LEJk8';

// Create a new bot instance with manual polling
const bot = new TelegramBot(token, {
  polling: {
    autoStart: true,
    interval: 300, // Poll every 300ms for faster response
  },
});

// Listener for the /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  try {
    // Send a welcome message with inline keyboard buttons
    const welcomeMessage = `
Hey there! 🎉 Welcome to iCoin! 

We’re all about building a simple, fun, and decentralized trading platform right here on Telegram. Whether you're into trading new tokens, memecoins, or looking for the next big thing, iCoin’s got your back. Plus, we've got some gamified features to make things even more exciting!

Here’s what you can dive into right now:
💯 Earn iCoin Points: Join our Drop game and start collecting iCoin Points (IPs).
👥 Invite Your Crew: The more friends you bring, the more IPs you earn! Simple math, right?
🎯 Complete Quests: Tackle some fun challenges and rack up more IPs along the way.

So what are you waiting for? Start earning those points today, and who knows, you might score something amazing soon! 🚀

Keep the iCoin spirit alive! 🌟
    `;

    // Inline keyboard buttons with web app for Farm and callback for Community
    const options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: '🌱 Farm',
              web_app: { url: 'https://lokiloki2345.github.io/hookbaby/' } // Web app link to open in Telegram webview
            },
            {
              text: '👥 Community',
              callback_data: 'community' // Standard callback for community button
            }
          ]
        ]
      })
    };

    // Send the message with inline keyboard
    bot.sendMessage(chatId, welcomeMessage, options);
  } catch (error) {
    console.error('Error while sending the message:', error);
    bot.sendMessage(chatId, 'Uh oh, something went wrong! Give it another go.');
  }
});

// Listener for button clicks (callback queries)
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const action = query.data;

  if (action === 'community') {
    bot.sendMessage(chatId, '👥 You clicked on the Community button! Join our community.');
  }

  // Optional: Acknowledge the callback query
  bot.answerCallbackQuery(query.id);
});

// Global error handling for polling errors
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.code, error.response?.body);
});

// Error handling for general bot errors
bot.on('error', (error) => {
  console.error('Bot error:', error);
});
