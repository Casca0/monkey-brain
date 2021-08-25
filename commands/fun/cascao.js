const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'cascão',
  execute(message) {
    const embed = new MessageEmbed()
      .setTitle('CASCÃO FILMES')
      .setColor('#ffffff')
      .setImage('https://i.imgur.com/ezTvkyx.png');
    message.channel.send({ embeds: [ embed ] });
  },
};
