/* eslint-disable no-unused-vars */
const items = require('../../models/userItems');
module.exports = {
  name: 'inventario',
  aliases: ['inv', 'i'],
  description: 'Mostra seu inventário.',
  usage: '?inventario',
  async execute(message, profileData, args, Discord) {
    try {
      const userItems = await items.find({ user_id: message.author.id });
      if (userItems == '') {
        message.reply('Seu inventário está vazio!');
      }
      else {
        const useCase = userItems.useDescription ? userItems.useDescription : 'Não há como usar.';
        const inv = new Discord.MessageEmbed({
          title: 'Inventário 🎒',
          fields: await Promise.all(
            userItems.map(async item => ({
              name: item.item_name.charAt(0).toUpperCase() + item.item_name.slice(1),
              value: useCase,
            })),
          ),
        });
        message.reply({ embeds: [inv] });
      }
    }
    catch (err) {
      console.log(err);
      return;
    }
  },
};