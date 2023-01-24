const TelegramBot = require('node-telegram-bot-api');
const Browser = require('./browser');

const token = '';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  let chatMessage = msg.text.toLowerCase();

  if (chatMessage == '/start' | chatMessage == '/help') {
    bot.sendMessage(chatId, `Enter a word to find out it's article`);
  }

  if (chatMessage.includes('ß')) {
    chatMessage = chatMessage.replace('ß', 'sz')
  } 
  else if (chatMessage.includes('ö')) {
    chatMessage = chatMessage.replace('ö', 'oe')
  } 
  else if (chatMessage.includes('ü')) {
    chatMessage = chatMessage.replace('ü', 'ue')
  } 
  else if (chatMessage.includes('ä')) {
    chatMessage = chatMessage.replace('ä', 'ae')
  }  

  let capitalizedWord = chatMessage.charAt(0).toUpperCase() + chatMessage.slice(1);

  try {
    const result = await Browser.getWord(capitalizedWord);
    bot.sendMessage(chatId, result);
  } catch(e) {
    console.log(e);
    bot.sendMessage(chatId, 'Sorry, this word is not found. Try again')
  }

  
});
