const profileModel = require('../../models/profileSchema');

module.exports = {
  name: 'cname',
  description: 'Verifica a carteira do usuário',
  async execute(message, profileData, args) {
    if(args[0]) {
      // eslint-disable-next-line no-unused-vars
      const response = await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $set: {
            walletName: args[0],
          },
        },
      );
      message.channel.send('O nome da sua carteira foi alterado para `' + args[0] + '`');
    }
    else {
      message.channel.send('O nome da sua carteira é `' + profileData.walletName + '`');
    }
  },
};