const profileModel = require('../../models/profileSchema');
module.exports = {
  name: 'depositar',
  aliases: ['dep'],
  description: 'Deposita dinheiro no seu banco.',
  async execute(message, profileData, args) {
    let amount = args[0];
    if (amount === 'all') amount = profileData.coins;
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