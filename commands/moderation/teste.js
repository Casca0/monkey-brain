/* eslint-disable no-unused-vars */
const schedule = require('node-schedule');
const time = '*/1 * * * *';
const shop = require('../../models/shopItems.js');
const job = schedule.scheduleJob(time, () => {
	return;
});

module.exports = {
  name: 'teste',
  aliases: ['t'],
  cooldown: 10,
	// cooldown: Date.parse(job.nextInvocation().toISOString()) - Date.now(),
  description: 'Comando para testar funções do bot (ADMIN)',
	category: 'moderation',
  async execute(message, profileData, args, Discord, client) {
    if (message.member.permissions.has('ADMINISTRATOR')) {
      try {
				const rolesMenu = new Discord.MessageActionRow().addComponents(
					new Discord.MessageSelectMenu()
						.setCustomId('select')
						.setPlaceholder('sexo?')
						.addOptions([
							{
								label: 'AA MIZERA',
								description: 'TESTE',
								value: '808493361186734090',
							},
							{
								label: 'AA MIZERA 2',
								description: 'TESTE 2',
								value: '987170775561822249',
							},
						]),
				);
				const testEmbed = new Discord.MessageEmbed({
					title: 'SEXO',
					description: 'AAAAAAAAAAAAAAA',
				});
				const rolesMessage = await message.reply({ embeds: [testEmbed], components: [rolesMenu], ephemeral: true });
				const collector = rolesMessage.createMessageComponentCollector();
				collector.on('collect', async interaction => {
					const user = message.guild.members.resolve(message.author);
					const role = message.guild.roles.cache.get(interaction.values[0]);
					user.roles.add(role).catch(console.error);
					await interaction.update({ components: [] });
				});
      }
      catch (err) {
        console.log(err);
        return;
      }
    }
    else {
      message.reply('Que se tá fazendo aqui?');
    }
  },
};
