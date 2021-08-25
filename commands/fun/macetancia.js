const { MessageEmbed } = require('discord.js');
const { macetaVibes } = require('./macetanciaMoves.json');

module.exports = {
  name: 'macetancia',
	// cooldown: 30,
  async execute(message) {
    await message.guild.members.fetch();
    const user = message.guild.members.cache.random().user;
    const lenght = macetaVibes.length - 1;
    const index = Math.round(Math.random() * lenght);
    const maceta = macetaVibes[index];
    const m = `${maceta} ${user}`;
    let em;

    switch (user.id) {
      case '380198082811396097':
        em = new MessageEmbed()
          .setTitle('Você tentou macetar o ADEMIR?')
          .setDescription(`${user}`)
          .setColor('#967927')
          .setImage('https://media1.tenor.com/images/1d78b613692b7cfe01c2f2a4a0b2f6fc/tenor.gif?itemid=5072717');
        message.channel.send({ embeds: [em] });
        break;
        case '720849770624581692':
          em = new MessageEmbed()
          .setTitle('Você tentou me macetar?')
          .setColor('#967927')
          .setImage('https://i.imgur.com/mWw7OIa.gif');
          message.channel.send({ embeds: [em] });
        break;
        case message.author.id:
          em = new MessageEmbed()
            .setTitle('vose c masseto?')
            .setColor('#967927')
            .setImage('https://i.imgur.com/mWw7OIa.gif');
          message.channel.send({ embeds: [em] });
          break;
      default:
        message.channel.send(m);
        break;
    }
  },
};