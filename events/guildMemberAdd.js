const { MessageEmbed, Collection } = require('discord.js');

module.exports = {
  name: 'guildMemberAdd',
  execute(member) {
    const guild = member.guild;
    const newUsers = new Collection();
    const emoji = member.guild.emojis.cache.find(emj => emj.name == 'Cascamemes');
    newUsers.set(member.id, member.user);
    const defaultChannel = guild.channels.cache.get('808458807209361438');
    const userList = newUsers.map(u => u.toString()).join(' ');
    const embed = new MessageEmbed()
      .setColor('#f0f714')
      .setTitle('Iniciativa Mammus')
      .setDescription(`Bem-vindo(a) macaquinho(a) tome uma banana 🍌\nMe dê uma beijoca! ${emoji}\n` + userList)
      .setThumbnail(member.user.avatarURL());
    defaultChannel.send(embed);
  },
};