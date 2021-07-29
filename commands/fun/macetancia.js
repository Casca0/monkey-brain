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
      m ='VOCÊ MACETOU O ADM, QUE FILHO DA PUTA!';
      message.channel.send(m);
    }

    else {
      message.channel.send(m);
    }
  }, 
};
