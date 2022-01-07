/* eslint-disable no-unused-vars */
const items = require('../../models/userItems');
module.exports = {
  name: 'inventario',
  aliases: ['inv', 'i'],
  description: 'Mostra seu inventário.',
  usage: '?inventario',
  async execute(message, profileData, args) {
    try {
      const userItems = await items.find({ user_id: message.author.id });
      if (!userItems) {
        message.reply('Seu inventário está vazio!');
      }
      else {
        const inv = userItems.map(i => `${i.amount} ${i.item_name.charAt(0).toUpperCase() + i.item_name.slice(1)}`).join(', ');
        message.reply(inv);
      }
    }
    catch (err) {
      console.log(err);
      message.reply('Seu inventário está vazio!');
      return;
    }
  },
};