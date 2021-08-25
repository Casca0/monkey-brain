const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'luqueta',
  execute(message) {
    const embed = new MessageEmbed()
      .setTitle('ASSINA MEU ONLYFANS')
      .setColor('#d51b51')
      .setImage('https://c.tenor.com/iZU7Q5iiDn8AAAAS/take-a-seat-come.gif');
    message.channel.send({ embeds: [ embed ] });
  },
};