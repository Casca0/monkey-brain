const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'scher',
  execute(message) {
    const embed = new MessageEmbed()
      .setTitle('SCHER TÉCNICO')
      .setColor('#f70088')
      .setImage('https://i.imgur.com/htsCJ7A.jpg');
    message.channel.send({ embeds: [ embed ] });
  },
};
