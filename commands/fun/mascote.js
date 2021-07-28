const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'mascote',
  execute(message) {
    const embed = new MessageEmbed()
      .setTitle('MASCOTE DA MAMMUS')
      .setColor('#f70088')
      .setImage('https://i.imgur.com/UahVi47.png');
    message.channel.send(embed);
  },
};
