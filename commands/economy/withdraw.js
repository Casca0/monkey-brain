const profileModel = require('../../models/profileSchema');

module.exports = {
  name: 'retirar',
  aliases: ['rt'],
  description: 'Retira dinheiro do seu banco.',
  usage: '?retirar <quantia do seu banco>',
  async execute(message, profileData, args) {
    let amount = args[0];
    if (amount === 'all') amount = profileData.bank;
    if (amount % 1 != 0 || amount <= 0) return message.reply('Use um número inteiro!');

    try {
      if (amount > profileData.bank) return message.reply('Você não tem essa quantia de BRs para retirar!');

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

      return message.reply(`Você retirou ${amount} Bananinhas Reais`);
    }
    catch (err) {
      console.log(err);
    }
  },
};