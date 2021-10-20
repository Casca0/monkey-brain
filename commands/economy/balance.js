const { MessageEmbed } = require('discord.js');
const profileModel = require('../../models/profileSchema');

module.exports = {
  name: 'saldo',
  aliases: ['sal', 'bal'],
  description: 'Verifica a carteira do usuário',
  async execute(message, profileData) {
    let em = new MessageEmbed()
      .setTitle(`${profileData.walletName}`)
      .setColor('#32a84a')
      .setDescription('WIP')
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .addField('Carteira', `:dollar: \nBR ${profileData.coins}`)
      .addField('Banco', `:coin: \nBR ${profileData.bank}`)
      .addField('Contador Macetância', `:monkey: ${profileData.macetanciaCounter}`);

    // Se marcar um usuário, mostrar a carteira dele.

    const user = message.mentions.users.first();
    if(user) {
      const member = message.guild.members.resolve(user);
      const userBal = await profileModel.findOne({ userID: member.id });
      if (!userBal) {
        return message.channel.send('O Usuário não foi encontrado!');
      }
      em = new MessageEmbed()
        .setTitle(`${userBal.walletName}`)
        .setColor('#32a84a')
        .setDescription('WIP')
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addField('Carteira', `:dollar: \nBR ${userBal.coins}`)
        .addField('Banco', `:coin: \nBR ${userBal.bank}`)
        .addField('Contador Macetância', `:monkey: ${userBal.macetanciaCounter}`);
      return message.channel.send({ embeds: [em] });
    }
    message.channel.send({ embeds: [em] });
  },
};