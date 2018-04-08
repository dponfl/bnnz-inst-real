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

bot.onText(/start (.+)/, (msg, [source, match]) => {

  console.log('Bot got start command with source:');
  console.dir(source);

  console.log('Bot got start command with match:');
  console.dir(match);

});

bot.on('message', msg => {

  console.log('Msg:');
  console.dir(msg);

  const chatId = msg.chat.id;

  if (!_.isNil(msg.reply_to_message)
    && !_.isNil(msg.reply_to_message.text)
    && msg.reply_to_message.text == 'Place link to your Inst post') {
    _sendMessage(chatId, msg.text);
  }

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

function _sendMessage(id, link) {

  console.log('_sendMessage:');
  console.dir(config);

  _.each(config.clients, (elem) => {
    if (elem.chatId == id) {
      console.log('elem.chatId == id');

      switch (elem.access) {
        case 'platinum':
          console.log('platinum');
          _.each(config.clients, (el) => {
            if (elem.chatId != el.chatId) {
              bot.sendMessage(el.chatId, 'Ваш друг '+ elem.name
                + ' выгрузил новое фото. Кликните, чтобы открыть этот пост >>> '
                + link);
            }
          });
          break;
        case 'gold':
          console.log('gold');
          break;
        case 'silver':
          console.log('silver');
          break;
        case 'bronze':
          console.log('bronze');
          break;
        default:
          console.log('default');
      }
    }
  });

} // _sendMessage

