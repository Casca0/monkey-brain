const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'viteco',
  execute(message) {
    const embed = new MessageEmbed()
      .setTitle('VITECO SARRADAS')
      .setColor('#fc0356')
      .setImage('https://i.imgur.com/16PCEuj.jpg');
    message.channel.send(embed);
  },
};
