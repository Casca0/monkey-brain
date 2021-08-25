const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'xuliana',
  execute(message) {
    const embed = new MessageEmbed()
      .setTitle('Xuliana Kpoper')
      .setColor('#26d6ff')
      .setImage('https://c.tenor.com/wq0PXInk6UAAAAAC/dahyun-kpop.gif');
    message.channel.send({ embeds: [ embed ] });
  },
};
