const TelegramBot = require('node-telegram-bot-api');
const debug = require('./helpers');
const config = require('./config');

const _ = require('lodash');

console.log('Bot has been started ....');


const bot = new TelegramBot(config.TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10
    }
  }
});

// _.each(config.clients, (elem) => {
//   if (elem.name == 'User02') {
//     bot.sendMessage(elem.chatId, 'First test message...');
//   }
// });

bot.on('message', msg => {

  console.log('Msg:');
  console.dir(msg);

  const chatId = msg.chat.id;

  if (msg.text === 'Закрыть') {

    bot.sendMessage(chatId, 'Закрываю клавиатуру', {
      reply_markup: {
        remove_keyboard: true
      }
    })

  } else if (msg.text === 'Send post') {

    bot.sendMessage(chatId, 'Place link to your Inst post', {
      reply_markup: {
        force_reply: true
      }
    })

  } else {
    bot.sendMessage(chatId, 'Клавиатура', {
      reply_markup: {
        keyboard: [
          [{
            text: 'Отправить местоположение',
            request_location: true
          }],
          ['Send post', 'Закрыть'],
          [{
            text: 'Отправить контакт',
            request_contact: true
          }]
        ],
        one_time_keyboard: true
      }
    })
  }

});

