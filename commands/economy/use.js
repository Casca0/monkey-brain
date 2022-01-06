/* eslint-disable no-unused-vars */
const shop = require('../../models/shopItems.js');
module.exports = {
  name: 'use',
  aliases: ['u'],
  async execute(message, profileData, args) {
    try {
      const item = shop.items.filter(items => { return items.name == args[0].toLowerCase(); });
      item[0].use(message, args, profileData);
    }
    catch (err) {
      console.log(err);
      message.channel.send('Ocorreu um erro ao tentar usar o item.');
    }
  },
};