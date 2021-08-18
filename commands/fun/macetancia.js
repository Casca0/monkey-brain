const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'macetancia',
  async execute(message) {
    await message.guild.members.fetch();
    const user = message.guild.members.cache.random().user;
    let m = `VOCÊ ACABA DE MACETAR ${user}`

    if (user == message.author) {
      m = 'CARALHO!\nVOCÊ SE MACETOU!!!';
      message.channel.send(m);
    }
    else if (user.id == '840221907622166579') {
      const embed = new MessageEmbed()
        .setTitle('Você tentou me macetar?')
        .setColor('#967927')
        .setImage('https://i.imgur.com/mWw7OIa.gif');
      message.channel.send(embed);
    }
    else if (user.bot == true) {
      m = 'TU TENTOU MACETAR UM BOT E TU FOI MACETADO';
      message.channel.send(m);
    }
    else if (user.id == '380198082811396097') {
      const embed = new MessageEmbed()
        .setTitle(`Você tentou macetar o ADM?`)
				.setDescription(user)
        .setColor('#967927')
        .setImage('https://media1.tenor.com/images/1d78b613692b7cfe01c2f2a4a0b2f6fc/tenor.gif?itemid=5072717');
      message.channel.send(embed);
    }

    else {
      message.channel.send(m);
    }
  }, 
};
