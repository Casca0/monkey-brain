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
       const teste = message.member.roles.cache.find((role) => {role == '829091854842724372';});
       console.log(message.member.permissions.has('ADMINISTRATOR'));
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