const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'boldini',
  execute(message) {
    const embed = new MessageEmbed()
      .setTitle('BOLDINI FUTANARI')
      .setColor('#fc03a5')
      .setImage('https://i.imgur.com/BSvdkhZ.png');
    message.channel.send({ embeds: [ embed ] });
  },
};