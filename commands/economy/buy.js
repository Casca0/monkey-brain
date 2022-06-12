/* eslint-disable no-unused-vars */
const shop = require('../../models/shopItems.js');
const inventory = require('../../models/userItems');
const profileModel = require('../../models/profileSchema');

module.exports = {
  name: 'comprar',
  aliases: ['b', 'cpr'],
  description: 'Compra um produto da loja.',
	category: 'economy',
  usage: '?comprar <produto> <quantia>',
  async execute(message, profileData, args, Discord) {
    try {

      // Validação de quantidade

      let qtn;
      const qntValidation = isNaN(parseInt(args[args.length - 1]));
      if (qntValidation == true) {
        qtn = 1;
      }
      else {
        qtn = args.pop();
      }
      if (parseInt(args[args.length - 1]) <= 0) {
        return message.reply('Informe uma quantia válida');
      }

      // Declarão de variáveis

      const item = shop.items.filter(items => { return items.name == args.join(' ').toLowerCase(); });
      const itemUse = item[0].useDescription == '' ? 'Não há uso.' : item[0].useDescription;
      const cost = (item[0].cost * qtn) * -1;
      const itemValidation = await inventory.findOne({ user_id: message.author.id, item_name: item[0].name });
      const receipt = new Discord.MessageEmbed({
        title: 'Recibo',
        fields: [
          {
            name: 'Item',
            value: `\`${item[0].name}\``,
          },
          {
            name: 'Quantia',
            value: `\`${qtn}\``,
          },
          {
            name: 'Valor total',
            value: `\`BR ${cost * -1}\``,
          },
        ],
        color: '#ffffff',
        footer: {
          text: 'Muito obrigado por sua compra!',
          icon_url: message.author.avatarURL(),
        },
      });

      // Validação de item e valor

      if (cost > profileData.coins) { return message.reply('Você não tem moedas suficientes!'); }

      if (itemValidation) {
        await inventory.findOneAndUpdate({
          user_id: message.author.id,
          item_name: item[0].name,
        },
        {
          $inc: {
            amount: qtn,
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
        message.reply({ embeds: [receipt] });
      }
      else {
        const inv = await inventory.create({
          user_id: message.author.id,
          item_id: item[0].itemID,
          item_name: item[0].name,
          item_useDescription: itemUse,
          amount: qtn,
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
        message.reply({ embeds: [receipt] });
      }
    }
    catch (err) {
      console.log(err);
      return message.reply('Deu ruim meu nobre');
    }
  },
};