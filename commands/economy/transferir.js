const profileModel = require('../../models/profileSchema');
module.exports = {
  name: 'transferir',
  aliases: ['tr', 'trade'],
  description: 'Tranfesre uma quantia para álguem.',
  async execute(message, profileData, args) {
    let amount = args[0];
    const user = message.mentions.users.first();
    if (amount === 'all') amount = profileData.coins;
    if (amount % 1 != 0 || amount <= 0) return message.reply('A transferência tem que ser um número inteiro!\n?tr <quantia> <usuário>');
    if (user) {
      try {
        const member = message.guild.members.resolve(user);
        if (amount > profileData.coins) return message.reply('Você não tem essa quantia de BRs para transferir!');
        await profileModel.findOneAndUpdate(
          {
            userID: message.author.id,
          },
          {
            $inc: {
              coins: -amount,
            },
          },
        );
        await profileModel.findOneAndUpdate(
          {
            userID: member.id,
          },
          {
            $inc: {
              coins: amount,
            },
          },
        );
        return message.reply(`Você transferiu ${amount} Bananinhas Reais para ${member}`);
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      return message.reply('Você precisa mencionar álguem para transferir!\n?tr <quantia> <usuário>');
    }
  },
};