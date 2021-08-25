const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'gaybriel',
  execute(message) {
    const embed = new MessageEmbed()
      .setTitle('GAYBRIEL DE 4')
      .setColor('#ffffff')
      .setImage('https://i.imgur.com/FR0k1W4.png');
    message.channel.send({ embeds: [ embed ] });
  },
};
