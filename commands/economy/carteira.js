const profileModel = require('../../models/profileSchema');

module.exports = {
  name: 'cname',
  description: 'Muda o nome da carteira do usuário',
  async execute(message, profileData, args) {
    const name = args.join(' ');
    if(args[0]) {
      // eslint-disable-next-line no-unused-vars
      const response = await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $set: {
            walletName: name,
          },
        },
      );
      message.channel.send('O nome da sua carteira foi alterado para `' + name + '`');
    }
    else {
      message.channel.send(`O nome da sua carteira é ${profileData.walletName}`);
    }
  },
};