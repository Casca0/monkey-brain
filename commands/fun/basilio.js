const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'basilio',
  execute(message) {
    const embed = new MessageEmbed()
      .setTitle('BASÍLIO MACACO BRANCO')
      .setColor('#ffffff')
      .setImage('https://i.imgur.com/KrYc7V2.jpg');
    message.channel.send(embed);
  },
};