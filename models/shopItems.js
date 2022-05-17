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
  {
    'name': 'martelo do macaco',
    'itemID': 5,
    'cost': 150000,
    'useDescription': 'Dê uma martelada em outro macaco a sua escolha!',
    'use': async (message, args, profileData, Discord) => {
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.members.resolve(user);
        const embed = new Discord.MessageEmbed({
          title: 'BONK!',
          description: `${user}`,
          image: {
            url: 'https://c.tenor.com/Xr8J9quvUHgAAAAd/bonk.gif',
          },
          color: '#03fc0f',
        });
				const userEmbed = new Discord.MessageEmbed({
          title: 'MARTELADO PELO MACACÃO',
          description: 'Mas você ainda não está fora da luta!',
          fields: [
            {
              name: 'Convite',
              value: 'https://discord.gg/g2ewSK3PgB',
            },
          ],
          image: {
            url: 'https://c.tenor.com/mmGA03N6xHIAAAAM/donkey-kong-banana.gif',
					},
					color: '#f5e942',
        });
        message.channel.send({ embeds: [embed] });
        user.send({ embeds: [userEmbed] });
        member.kick();
      }
    },
  },
] };