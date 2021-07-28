module.exports = {
  name: 'macetancia',
  async execute(message) {
    await message.guild.members.fetch();
    const user = message.guild.members.cache.random().user;
    message.channel.send(`VOCÊ ACABA DE MACETAR ${user}`);

    if (user == message.author) {
      message.channel.send('CARALHO!\nVOCÊ SE MACETOU!!!');
    }
    else if (user.id == '840221907622166579') {
      message.channel.send('O FILHO DA PUTA, VOU TE TACAR A BANANA EM');
    }
    else if (user.bot == true) {
      message.channel.send('MAS ESSE CU É IMACETÁVEL!');
    }
    else if (user.id == '380198082811396097') {
      message.channel.send('VOCÊ MACETOU O ADM, QUE FILHO DA PUTA!');
    }
  },
};
