const shop = require('../../models/shopItems.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'shop',
  aliases: ['s'],
  description: 'Mostra a loja.',
  usage: '?shop',
  // eslint-disable-next-line no-unused-vars
  async execute(message, profileData, args) {
    try {
      const items = shop.items;
      const em = new MessageEmbed()
        .setTitle('LOJA DO PRETO')
        .setColor('#fcba03')
        .addField('Items', `${items.map(i => `:coin: BR ${i.cost} ${i.name.charAt(0).toUpperCase() + i.name.slice(1)}`).join('\n')}`)
        .setThumbnail('https://c.tenor.com/jJKcXYqft4AAAAAC/hehehe.gif');
      message.reply({ embeds: [ em ] });
    }
    catch (err) {
      console.log(err);
      return message.reply('Ocorreu um erro ao processar a loja!');
    }
  },
};