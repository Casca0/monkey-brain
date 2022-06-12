const commandPrefix = require('../../models/prefix');

module.exports = {
  name: 'prefix',
  aliases: ['p'],
  description: 'Um comando para alterar o prefixo.',
  category: 'general',
  usage: '?prefix <novo prefixo>',
  async execute(message, profileData, args) {
    const prefix = await commandPrefix.findOne().then(result => result.prefix);
    if (message.channel.type == 'DM') {
      message.reply('Este comando não pode ser executado no chat privado!');
      return;
    }
    if (args[0]) {
      if (message.member.permissions.has('ADMINISTRATOR')) {
        try {
          await commandPrefix.findOneAndUpdate({}, {
            prefix: args[0],
          });
          message.reply(`Prefixo alterado para : ${args[0]}`);
        }
        catch (err) {
          console.log(err);
          message.reply('Ocorreu um erro ao alterar o prefixo!');
        }
      }
    }
    else {
      message.reply(`O prefixo deste bot é : ${prefix}`);
    }
  },
};