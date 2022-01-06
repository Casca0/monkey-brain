/* eslint-disable no-unused-vars */
const shop = require('../../models/shopItems.js');
const inventory = require('../../models/userItems');
const profileModel = require('../../models/profileSchema');

module.exports = {
  name: 'comprar',
  aliases: ['b', 'cpr'],
  description: 'Compra um produto da loja.',
  usage: '?comprar <produto> <quantia>',
  async execute(message, profileData, args) {
    try {
      const item = shop.items.filter(items => { return items.name == args[0].toLowerCase(); });
      const cost = (item[0].cost * args[1]) * -1;
      const itemValidation = await inventory.findOne({ user_id: message.author.id, item_name: item[0].name });

      if (cost > profileData.coins) { return message.reply('Você não tem moedas suficientes!'); }

      if (itemValidation) {
        await inventory.findOneAndUpdate({
          user_id: message.author.id,
          item_name: item[0].name,
        },
        {
          $inc: {
            amount: args[1],
          },
        });
        await profileModel.findOneAndUpdate(
          {
            userID: message.author.id,
          },
          {
            $inc: {
              coins: cost,
            },
          },
        );
        message.reply('Você comprou algo!');
      }
      else {
        const inv = await inventory.create({
          user_id: message.author.id,
          item_id: item[0].item_id,
          item_name: item[0].name,
          amount: args[1],
        });
        inv.save();
        await profileModel.findOneAndUpdate(
          {
            userID: message.author.id,
          },
          {
            $inc: {
              coins: cost,
            },
          },
        );
        message.reply('Você comprou algo!');
      }
    }
    catch (err) {
      console.log(err);
      return message.reply('Deu ruim meu nobre');
    }
  },
};