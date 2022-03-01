/* eslint-disable no-unused-vars */
const { MessageEmbed, Collection } = require('discord.js');
const profileModel = require('../models/profileSchema');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member, client, Discord) {

    // Welcome message

    const guild = member.guild;
    const newUsers = new Collection();
    const emoji = member.guild.emojis.cache.find(emj => emj.name == 'hmm');
    newUsers.set(member.id, member.user);
    const defaultChannel = guild.channels.cache.get(guild.systemChannelId);
    const userList = newUsers.map(u => u.toString()).join(' ');
    const em = new MessageEmbed()
      .setColor('#f0f714')
      .setTitle('Iniciativa Mammus')
      .setDescription(`Bem-vindo(a) macaquinho(a) tome uma banana 🍌\nMe dê uma beijoca! ${emoji}\n` + userList)
      .setThumbnail(member.user.avatarURL());
    defaultChannel.send({ embeds: [em] });

    // Database

    const profile = await profileModel.create({
      userID: member.id,
      serverID: member.guild.id,
      coins: 1000,
      bank: 0,
      macetanciaCounter: 0,
      walletName: 'Extrato',
    });
    profile.save();
  },
};
