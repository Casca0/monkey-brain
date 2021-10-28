/* eslint-disable no-unused-vars */
const shop = require('../../models/currencyShop');
const inventory = require('../../models/userItems');
const profileModel = require('../../models/profileSchema');

module.exports = {
  name: 'comprar',
  aliases: ['b', 'crp'],
  description: '',
  async execute(message, profileData, args) {
    try {
      const item = await shop.findOne({ name: args[0].toLowerCase() });
      const cost = (item.cost * args[1]) * -1;
      const itemValidation = await inventory.findOne({ user_id: message.author.id, item_name: item.name });

      if (cost > profileData.coins) { return message.reply('Você não tem moedas suficientes!'); }

      if (itemValidation) {
        console.log('AAAAA SEXOOOOO');
        await inventory.findOneAndUpdate({
          user_id: message.author.id,
          item_name: item.name,
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
        console.log('SEXO');
        const inv = await inventory.create({
          user_id: message.author.id,
          item_id: item.item_id,
          item_name: item.name,
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