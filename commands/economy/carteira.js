const profileModel = require('../../models/profileSchema');

module.exports = {
  name: 'cname',
  description: 'Muda o nome da carteira do usuário',
  async execute(message, profileData, args) {
    if(args) {
      // eslint-disable-next-line no-unused-vars
      const response = await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $set: {
            walletName: [...args],
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