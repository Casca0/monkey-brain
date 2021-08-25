const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'viteco',
  execute(message) {
    const embed = new MessageEmbed()
      .setTitle('Vito-kun Kawaii')
      .setColor('#fc0356')
      .setImage('https://c.tenor.com/jqB9oQTf8zAAAAAC/sailor-wtf.gif');
    message.channel.send({ embeds: [ embed ] });
  },
};
