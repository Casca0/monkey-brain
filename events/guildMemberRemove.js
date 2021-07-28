const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'guildMemberRemove',
  execute(member) {
    const guild = member.guild;
    const defaultChannel = guild.channels.cache.get('808458807209361438');
    const embed = new MessageEmbed()
      .setColor('#18ed1f')
      .setTitle('Tchau Macaquinho')
      .setDescription(`Você não gostou da minha banana?\n😥 ${member}`)
      .setThumbnail(member.user.avatarURL());
    defaultChannel.send(embed);
  },
};