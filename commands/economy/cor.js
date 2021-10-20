const profileModel = require('../../models/profileSchema');

module.exports = {
  name: 'cor',
  aliases: ['cr'],
  description: 'Muda a cor da carteira do usuário',
  async execute(message, profileData, args) {
    const color = args[0];
    if(args[0]) {
      // eslint-disable-next-line no-unused-vars
      const response = await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $set: {
            walletColor: color,
          },
        },
      );
      message.channel.send('A cor da sua carteira foi alterado para `' + color + '`');
    }
    else {
      message.channel.send('A cor da sua carteira é `' + profileData.walletColor + '`');
    }
  },
};