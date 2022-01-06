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
      const itemValidation = await inventory.findOne({ user_id: user.id, item_name: this.name });

      if(itemValidation) {
        await inventory.findOneAndUpdate({
          user_id: user.id,
          item_name: this.name,
        },
        {
          $inc: {
            amount: args[1],
          },
        });
      }
      else {
        const inv = await inventory.create({
          user_id: user.id,
          item_id: this.item_id,
          item_name: this.name,
          amount: args[1],
        });
        inv.save();
      }

      message.channel.send(`Você jogou uma :banana: em ${user}!`);
    },
  },
  {
    'name': 'Anão granada',
    'itemID': 2,
    'cost': 50000,
  },
] };