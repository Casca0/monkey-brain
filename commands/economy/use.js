/* eslint-disable no-unused-vars */
const shop = require('../../models/shopItems.js');
const inventory = require('../../models/userItems.js');
module.exports = {
  name: 'use',
  aliases: ['u'],
  description: 'Usa um item.',
	category: 'economy',
  usage: '?use <item> <user se necessário>',
  async execute(message, profileData, args) {
    try {
      const item = shop.items.filter(items => { return items.name == args[0].toLowerCase(); });
      const itemValidation = await inventory.findOne({ user_id: message.author.id, item_name: item[0].name });
      if (itemValidation.amount === 1) {
        item[0].use(message, args, profileData);
        await inventory.deleteOne({ user_id: message.author.id, item_name: item[0].name });
      }
      else if (itemValidation) {
        item[0].use(message, args, profileData);
        await inventory.findOneAndUpdate({
          user_id: message.author.id,
          item_name: item[0].name,
        },
        {
          $inc: {
            amount: -1,
          },
        });
      }
      else {
        message.reply('Você não tem este item no seu inventário!');
      }
    }
    catch (err) {
      console.log(err);
      message.channel.send('Ocorreu um erro ao tentar usar o item.');
    }
  },
};