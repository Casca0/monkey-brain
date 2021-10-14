const profileModel = require('../../models/profileSchema');
module.exports = {
  name: 'retirar',
  aliases: ['rt'],
  description: 'Retira dinheiro do seu banco.',
  async execute(message, profileData, args) {
    let amount = args[0];
    if (amount === 'all') amount = profileData.bank;
    if (amount % 1 != 0 || amount <= 0) return message.channel.send('Use um número inteiro!');

    try {
      if (amount > profileData.bank) return message.channel.send('Você não tem essa quantia de BRs para retirar!');

      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: amount,
            bank: -amount,
          },
        },
      );

      return message.channel.send(`Você retirou ${amount} Bananinhas Reais`);
    }
    catch (err) {
      console.log(err);
    }
  },
};