const profileModel = require('../../models/profileSchema');

module.exports = {
  name: 'cor',
  aliases: ['cr'],
  description: 'Muda a cor da carteira do usuário',
  usage: '?cor <código hex>',
  async execute(message, profileData, args) {
    const color = args[0];
    const RegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    if (args[0]) {
      if (RegExp.test(color) === true) {
        // eslint-disable-next-line no-unused-vars
        await profileModel.findOneAndUpdate(
          {
            userID: message.author.id,
          },
          {
            $set: {
              walletColor: color,
            },
          },
        );
        message.reply('A cor da sua carteira foi alterado para `' + color + '`');
      }
      else { return message.reply('Cor inválida!'); }
    }
    else {
      message.reply('A cor da sua carteira é `' + profileData.walletColor + '`');
    }
  },
};