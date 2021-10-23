/* eslint-disable no-unused-vars */
const items = require('../../models/userItems');
module.exports = {
  name: 'inventario',
  aliases: ['inv'],
  async execute(message, profileData, args) {
    try {
      const all = await items.find({ user_id: message.author.id });
      const inv = all.map(i => `${i.amount} ${i.item_name.charAt(0).toUpperCase() + i.item_name.slice(1)}`).join(', ');
      message.reply(inv);
    }
    catch (err) {
      console.log(err);
      message.reply('Seu inventário está vazio!');
      return;
    }
  },
};