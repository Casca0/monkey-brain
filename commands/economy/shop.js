const shop = require('../../models/currencyShop');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'shop',
  aliases: ['s'],
  description: 'Mostra a loja.',
  // eslint-disable-next-line no-unused-vars
  async execute(message, profileData, args) {
    try {
      const items = await shop.find();
      const em = new MessageEmbed()
        .setTitle('LOJA DO PRETO')
        .setColor('#fcba03')
        .addField('Items', `${items.map(i => `:coin:BR${i.cost} ${i.name.charAt(0).toUpperCase() + i.name.slice(1)}`).join('\n')}`);
      message.reply({ embeds: [ em ] });
    }
    catch (err) {
      console.log(err);
      return message.reply('Ocorreu um erro ao processar a loja!');
    }
  },
};