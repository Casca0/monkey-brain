/* eslint-disable no-unused-vars */
const profileModel = require('../../models/profileSchema');
const shop = require('../../models/shopItems.js');
module.exports = {
  name: 'teste',
  aliases: ['t'],
  description: 'Comando para testar funções do bot (ADMIN)',
  async execute(message, profileData, args) {
    if (message.member.permissions.has('ADMINISTRATOR')) {
      try {
				let timeAmount;
				const amntValidation = isNaN(parseInt(args[0]));
				if (amntValidation == true) {
					timeAmount = 1;
				}
				else {
					timeAmount = args.shift() * 60000;
				}

				console.log(timeAmount);
				const reason = args.join(' ');
				console.log(reason);
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