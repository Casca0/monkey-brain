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
		let profileData;
    try {
      profileData = await profileModel.findOne({ userID: member.id });
      if (!profileData) {
        const profile = await profileModel.create({
          userID: member.id,
          serverID: member.guild.id,
          coins: 1000,
          bank: 0,
          macetanciaCounter: 0,
          walletName: 'Extrato',
        });
        profile.save();
      }
    // eslint-disable-next-line brace-style
    } catch (err) {
      console.log(err);
    }

		// Handler de cargo

		try {
			const rolesMenu = new Discord.MessageActionRow().addComponents(
				new Discord.MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Escolha o seu cargo')
					.addOptions([
						{
							label: 'Desempregado',
							emoji: '🤐',
							description: 'Explore o servidor e decida qual profissão seguir!',
							value: '1010012238750437396',
						},
						{
							label: 'Setor Operacional',
							emoji: '🧑‍🏭',
							description: 'Seja um operário dentro da maior corporação de macacos!',
							value: '1003831889162936381',
						},
						{
							label: 'Setor de RH',
							emoji: '🧑‍💻',
							description: 'Trabalhe com recursos humanos em uma corporação que não tem humanos!',
							value: '1003831494487314432',
						},
						{
							label: 'Setor Comercial',
							emoji: '🧑‍💼',
							description: 'Nos ajude à alcançar ainda mais macacos!',
							value: '1003831729863266325',
						},
						{
							label: 'Setor Financeiro',
							emoji: '💰',
							description: 'Nos ajude à evoluir a nossa corporação com a nossa distribuição de recursos!',
							value: '1003830819648970812',
						},
					]),
			);
			const professionEmbed = new Discord.MessageEmbed({
				title: 'Bem-vindo(a) à Mammus Corp.!',
				description: 'Para continuar dentro da corporação, selecione um cargo!',
				color: '#40ff66',
			});
			const rolesMessage = await member.send({ embeds: [professionEmbed], components: [rolesMenu], ephemeral: true });
			const collector = rolesMessage.createMessageComponentCollector();
			collector.on('collect', async interaction => {
				const user = member.guild.members.resolve(member);
				const role = member.guild.roles.cache.get(interaction.values[0]);
				user.roles.add(role).catch(console.error);
				await interaction.update({ components: [] });
			});
		}
		catch (err) {
			console.log(err);
			return;
		}
  },
};
