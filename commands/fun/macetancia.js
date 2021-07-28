module.exports = {
  name: 'macetancia',
  async execute(message) {
    await message.guild.members.fetch();
    const user = message.guild.members.cache.random().user;
    const m = `VOCÊ ACABA DE MACETAR ${user}`

    if (user) {
      message.channel.send(m);
    }

    if (user == message.author) {
      m = 'CARALHO!\nVOCÊ SE MACETOU!!!';
      message.channel.send(m);
    }
    else if (user.id == '840221907622166579') {
      m = 'TU TENTOU ME MACETAR?\nO FILHO DA PUTA, VOU TE TACAR A BANANA EM';
      message.channel.send(m);
    }
    else if (user.bot == true) {
      m = 'TU TENTOU MACETAR UM BOT E TU FOI MACETADO';
      message.channel.send(m);
    }
    else if (user.id == '380198082811396097') {
      m ='VOCÊ MACETOU O ADM, QUE FILHO DA PUTA!';
      message.channel.send(m);
    }
  },
};
