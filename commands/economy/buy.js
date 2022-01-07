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
      let quantia;
      if (isNaN(parseInt(args[args.length - 1]))) {
        quantia = 1;
      }
      else if (parseInt(args[args.length - 1]) <= 0) {
        return message.reply('Informe uma quantia válida');
      }
      else {
        quantia = args.pop();
      }
      const item = shop.items.filter(items => { return items.name == args.join(' ').toLowerCase(); });
      const itemUse = item[0].useDescription ? item[0].useDescription : 'Não há uso.';
      const cost = (item[0].cost * quantia) * -1;
      const itemValidation = await inventory.findOne({ user_id: message.author.id, item_name: item[0].name });

      if (cost > profileData.coins) { return message.reply('Você não tem moedas suficientes!'); }

      if (itemValidation) {
        await inventory.findOneAndUpdate({
          user_id: message.author.id,
          item_name: item[0].name,
        },
        {
          $inc: {
            amount: quantia,
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
          item_id: item[0].itemID,
          item_name: item[0].name,
          item_description: itemUse,
          amount: quantia,
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
        message.reply(`Você comprou \`${item[0].name}\` e pagou \`BR${cost * -1}\``);
      }
    }
    catch (err) {
      console.log(err);
      return message.reply('Deu ruim meu nobre');
    }
  },
};