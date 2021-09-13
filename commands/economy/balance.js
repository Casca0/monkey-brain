const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'balance',
  description: 'Verifica a carteira do usuário',
  execute(message, profileData) {
    const em = new MessageEmbed()
      .setTitle('Extrato')
      .setColor('#32a84a')
      .setDescription('WIP')
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .addField('Carteira', `:dollar: \nBR ${profileData.coins}`)
      .addField('Banco', `:coin: \nBR ${profileData.bank}`)
      .addField('Contador Macetância', `:monkey: ${profileData.macetanciaCounter}`);
    message.channel.send({ embeds: [em] });
  },
};