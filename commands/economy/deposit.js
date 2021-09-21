const profileModel = require('../models/profileSchema');
module.exports = {
  name: 'deposita',
  aliases: ['dep'],
  permissions: [],
  description: 'Deposita dinheiro no seu banco.',
  async execute(message, profileData, args) {
    const amount = args[0];
    if (amount % 1 != 0 || amount <= 0) return message.channel.send('O depósito tem que ser um número inteiro!');
    try {
      if (amount > profileData.coins) return message.channel.send('Você não tem essa quantia de moedas!');
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: -amount,
            bank: amount,
          },
        },
      );

      return message.channel.send(`Você depositou ${amount} Bananinhas Reais no seu banco!`);
    }
    catch (err) {
      console.log(err);
    }
  },
};