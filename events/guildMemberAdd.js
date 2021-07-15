const { MessageEmbed, Collection } = require('discord.js');

module.exports = {
  name: 'guildMemberAdd',
  execute(member) {
    const guild = member.guild;
    const newUsers = new Collection();
    newUsers.set(member.id, member.user);
    const defaultChannel = guild.channels.cache.get('808458807209361438');
    const userList = newUsers.map(u => u.toString()).join(' ');
    const embed = new MessageEmbed()
      .setColor('##bdba2a')
      .setTitle('Iniciativa Mammus')
      .setDescription('Bem-vindo(a) macaquinho(a) tome uma banana\nMe dê uma beijoca!\n' + userList)
      .setThumbnail(member.user.avatarURL());
    defaultChannel.send(embed);
  },
};