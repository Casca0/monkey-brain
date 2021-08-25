const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'gabu',
  execute(message) {
    const embed = new MessageEmbed()
      .setTitle('Fã do Muca')
      .setColor('#26d6ff')
      .setImage('https://c.tenor.com/YEydc6_JLWEAAAAS/mucalol-muquinha.gif');
    message.channel.send({ embeds: [ embed ] });
  },
};
