/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const { macetaVibes, macetaVisions, macetaColor } = require('./macetanciaMoves.json');
const profileModel = require('../../models/profileSchema');

module.exports = {
  name: 'macetancia',
	cooldown: 160,
  aliases: ['maceta', 'mct'],
  description: 'Macete um usuário aleatório e ganhe Bananas Reias por isso!',
  usage: '?macetancia',
  async execute(message) {
    await message.guild.members.fetch();
    const user = message.guild.members.cache.random().user;

    const l1 = macetaVibes.length - 1;
    const i1 = Math.round(Math.random() * l1);
    const l2 = macetaVisions.length - 1;
    const i2 = Math.round(Math.random() * l2);
    const l3 = macetaColor.length - 1;
    const i3 = Math.round(Math.random() * l3);
    const maceta = macetaVibes[i1];
    const visions = macetaVisions[i2];
    const color = macetaColor[i3];

    const randomNumber = Math.floor(Math.random() * 300) + 1;
    let em;
    let response;
    let counter;

    const m = new MessageEmbed()
      .setTitle(`Você ganhou ${randomNumber} Bananinhas Reais :coin::banana:`)
      .setDescription(`${maceta}${user}`)
      .setColor(`${color}`)
      .setImage(`${visions}`);

    // Database

    let profileData;
    try {
      profileData = await profileModel.findOne({ userID: user.id });
      if (!profileData) {
        const profile = await profileModel.create({
          userID: user.id,
          serverID: message.guild.id,
          coins: 1000,
          bank: 0,
          macetanciaCounter: 0,
          walletName: 'Extrato',
        });
        profile.save();
      }
    // eslint-disable-next-line brace-style
    } catch (err) {
      console.log(err);
    }

    switch (user.id) {
      case '380198082811396097':
        em = new MessageEmbed()
          .setTitle('Você tentou macetar o ADEMIR?')
          .setDescription(`${user}`)
          .setColor(`${color}`)
          .setImage('https://media1.tenor.com/images/1d78b613692b7cfe01c2f2a4a0b2f6fc/tenor.gif?itemid=5072717');
        message.channel.send({ embeds: [em] });
        response = await profileModel.findOneAndUpdate(
          {
            userID: message.author.id,
          },
          {
            $inc: {
              coins: 600,
            },
          },
        );
        counter = await profileModel.findOneAndUpdate(
          {
            userID: user.id,
          },
          {
            $inc: {
              macetanciaCounter: 1,
            },
          },
        );
        break;
        case '720849770624581692':
          em = new MessageEmbed()
            .setTitle('Você tentou me macetar?')
            .setColor(`${color}`)
            .setImage('https://i.imgur.com/mWw7OIa.gif');
          message.channel.send({ embeds: [em] });
        break;
        case message.author.id:
          em = new MessageEmbed()
            .setTitle('Você se macetou, parabéns :banana:')
            .setColor(`${color}`)
            .setImage(`${visions}`);
          message.channel.send({ embeds: [em] });
          counter = await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc: {
                macetanciaCounter: 1,
              },
            },
          );
          break;
      default:
				if (user.bot == true) {
					em = new MessageEmbed()
						.setTitle('TCHU TCHU')
						.setDescription(`${user}`)
            .setColor(`${color}`)
						.setImage('https://c.tenor.com/ebTWNO6KmNYAAAAC/picapau-puchapenas.gif');
					message.channel.send({ embeds: [em] });
          return;
				}

        // Coins

        response = await profileModel.findOneAndUpdate(
          {
            userID: message.author.id,
          },
          {
            $inc: {
              coins: randomNumber,
            },
          },
        );

        counter = await profileModel.findOneAndUpdate(
          {
            userID: user.id,
          },
          {
            $inc: {
              macetanciaCounter: 1,
              coins: -randomNumber,
            },
          },
        );

        message.channel.send({ embeds: [m] });
        break;
    }
  },
};