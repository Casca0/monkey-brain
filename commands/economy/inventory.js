/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
const items = require('../../models/userItems');
module.exports = {
  name: 'inventario',
  aliases: ['inv', 'i'],
  description: 'Mostra seu inventário.',
  usage: '?inventario <user>',
  async execute(message, profileData, args, Discord) {
    try {
      const user = message.mentions.users.first();
      if (user) {
        const mentionItems = await items.find({ user_id: user.id });
        if (mentionItems == '') {
          message.reply('Inventário vazio.');
        }
        else {
          const inv = new Discord.MessageEmbed({
            title: 'Inventário 🎒',
            fields: await Promise.all(
              mentionItems.map(async item => ({
                name: item.item_name.charAt(0).toUpperCase() + item.item_name.slice(1) + ` - \`${item.amount}\``,
                value: item.item_useDescription == '' ? 'Não há como usar.' : item.item_useDescription,
              })),
            ),
            color: '#0da31c',
            thumbnail: {
              url: user.avatarURL(),
            },
          });
          message.reply({ embeds: [inv] });
        }
      }
      else {
        const userItems = await items.find({ user_id: message.author.id });
        if (userItems == '') {
          message.reply('Seu inventário está vazio.');
        }
        else {
          const inv = new Discord.MessageEmbed({
            title: 'Inventário 🎒',
            fields: await Promise.all(
              userItems.map(async item => ({
                name: item.item_name.charAt(0).toUpperCase() + item.item_name.slice(1) + ` - \`${item.amount}\``,
                value: item.item_useDescription == '' ? 'Não há como usar.' : item.item_useDescription,
              })),
            ),
            color: '#0da31c',
            thumbnail: {
              url: message.author.avatarURL(),
            },
          });
          message.reply({ embeds: [inv] });
        }
      }
    }
    catch (err) {
      console.log(err);
      return;
    }
  },
};