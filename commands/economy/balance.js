const { MessageEmbed } = require('discord.js');
const profileModel = require('../../models/profileSchema');

module.exports = {
  name: 'saldo',
  aliases: ['sal', 'bal'],
  description: 'Verifica o saldo do usuário',
	category: 'economy',
  usage:'?saldo <user>',
  async execute(message, profileData) {
    let em = new MessageEmbed()
      .setTitle(`${profileData.walletName}`)
      .setColor(profileData.walletColor)
      .setDescription('WIP')
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'Carteira', value: `:dollar: BR ${profileData.coins}`, inline: true },
        { name: 'Banco', value: `:coin: BR ${profileData.bank}`, inline: true },
        { name: 'Contador Macetância', value: `:monkey: ${profileData.macetanciaCounter}` },
      );

    // Se marcar um usuário, mostrar a carteira dele.

    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.members.resolve(user);
      const userBal = await profileModel.findOne({ userID: member.id });
      if (!userBal) {
        return message.reply('O Usuário não foi encontrado!');
      }
      em = new MessageEmbed()
        .setTitle(`${userBal.walletName}`)
        .setColor(userBal.walletColor)
        .setDescription('WIP')
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addFields(
          { name: 'Carteira', value: `:dollar: BR ${userBal.coins}`, inline: true },
          { name: 'Banco', value: `:coin: BR ${userBal.bank}`, inline: true },
          { name: 'Contador Macetância', value: `:monkey: ${userBal.macetanciaCounter}` },
        );
      return message.reply({ embeds: [em] });
    }
    message.reply({ embeds: [em] });
  },
};