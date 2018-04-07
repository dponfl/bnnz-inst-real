const TelegramBot = require('node-telegram-bot-api');
const debug = require('./helpers');
const TOKEN = '';

const _ = require('lodash');

console.log('Bot has been started ....');

const clients = [
  {
    name: 'Dima',
    chatId: '',
    access: '',
    rooms: [],
  },
  {
    name: 'Me',
    chatId: '',
    access: '',
    rooms: [],
  },
  {
    name: 'Tanya',
    chatId: '',
    access: '',
    rooms: [],
  },
];

const rooms = [
  {
    roomName: 'Room01',
  },
];

const access = [
  {
    accessName: 'platinum',
  },
  {
    accessName: 'gold',
  },
  {
    accessName: 'silver',
  },
  {
    accessName: 'bronze',
  },
];


const bot = new TelegramBot(TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10
    }
  }
});

bot.on('message', msg => {

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
