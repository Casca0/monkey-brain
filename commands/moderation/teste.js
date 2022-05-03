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
	cooldown: Date.parse(job.nextInvocation().toISOString()) - Date.now(),
  description: 'Comando para testar funções do bot (ADMIN)',
	category: 'moderation',
  async execute(message, profileData, args, Discord, client) {
    if (message.member.permissions.has('ADMINISTRATOR')) {
      try {
				const categoryButtonGeneral = new Discord.MessageButton({
					style: 'SECONDARY',
					label: 'Geral',
					emoji: '⚙',
					customId: 'general',
				});

				const categoryButtonEconomy = new Discord.MessageButton({
					style: 'SECONDARY',
					label: 'Economia',
					emoji: '💰',
					customId: 'economy',
				});

				const categoryButtonModeration = new Discord.MessageButton({
					style: 'SECONDARY',
					label: 'Administração',
					emoji: '🦧',
					customId: 'moderation',
				});

				const testMessage = new Discord.MessageEmbed({
					title: 'teste',
					color: '#0f12bd',
				});

				const sendMessage = await message.channel.send({
					embeds: [testMessage],
					components: [new Discord.MessageActionRow({
						components: [categoryButtonGeneral, categoryButtonEconomy, categoryButtonModeration],
					})],
				});

				const collector = sendMessage.createMessageComponentCollector();
				const testEmbed = new Discord.MessageEmbed({
					title: 'sexo',
					color:'#0f1',
					description: 'sexo',
				});

				collector.on('collect', async interaction => {
					console.log(interaction);
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