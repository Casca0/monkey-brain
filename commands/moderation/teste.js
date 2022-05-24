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
				const user = message.mentions.users.first();
        const embed = new Discord.MessageEmbed({
          title: 'BONK!',
          description: `${user}`,
          image: {
            url: 'https://c.tenor.com/Xr8J9quvUHgAAAAd/bonk.gif',
          },
          color: '#03fc0f',
        });
        message.reply({ embeds: [embed] });
				// const userEmbed = new Discord.MessageEmbed({
        //   title: 'MARTELADO PELO MACACÃO',
        //   description: 'Mas você ainda não está fora da luta!',
        //   fields: [
        //     {
        //       name: 'Convite',
        //       value: 'https://discord.gg/g2ewSK3PgB',
        //     },
        //   ],
        //   image: {
        //     url: 'https://c.tenor.com/mmGA03N6xHIAAAAM/donkey-kong-banana.gif',
				// 	},
				// 	color: '#f5e942',
        // });
				// user.send({ embeds: [userEmbed] });
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