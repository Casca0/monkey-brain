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
  async execute(message, profileData, args, Discord, client) {
    if (message.member.permissions.has('ADMINISTRATOR')) {
      try {
				const items = shop.items;
				items.forEach(item => {
					client.shopItems.set(item.name, item);
				});
				console.log('Items', client.shopItems);
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