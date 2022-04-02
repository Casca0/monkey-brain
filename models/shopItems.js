/* eslint-disable no-unused-vars */
const inventory = require('./userItems.js');

module.exports = { items: [
  {
    'name': 'banana',
    'itemID': 1,
    'cost': 10000,
    'useDescription' : 'Use este item para jogar uma banana em alguém.',
    'use': async (message, args, profileData) => {
      await message.guild.members.fetch();
      const user = message.guild.members.cache.random().user;
      const itemValidation = await inventory.findOne({ user_id: user.id, item_name: 'banana' });

      if (itemValidation) {
        await inventory.findOneAndUpdate({
          user_id: user.id,
          item_name: 'banana',
        },
        {
          $inc: {
            amount: 1,
          },
        });
      }
      else {
        const inv = await inventory.create({
          user_id: user.id,
          item_id: 1,
          item_name: 'banana',
          item_useDescription: 'Use este item para jogar uma banana em alguém.',
          amount: 1,
        });
        inv.save();
      }

      message.channel.send(`Você jogou uma :banana: em ${user}!`);
    },
  },
  {
    'name': 'anão granada',
    'itemID': 2,
    'cost': 50000,
    'useDescription': '',
  },
  {
    'name': 'calcinha de renda preta',
    'itemID': 3,
    'cost': 5000,
    'useDescription': '',
  },
  {
    'name': 'calcinha de renda vermelha',
    'itemID': 4,
    'cost': 8000,
    'useDescription': '',
  },
] };