const { prefix } = require('../config.json');
const profileModel = require('../models/profileSchema');

module.exports = {
  name:'messageCreate',
  async execute(message, client, Discord) {
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // Command cooldown

    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = command.cooldown || 3;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`Por favor espere \`${timeLeft.toFixed(0)}\` segundos antes de usar o comando \`${command.name}\`.`);
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Database

    let profileData;
    try {
      profileData = await profileModel.findOne({ userID: message.author.id });
      if (!profileData) {
        const profile = await profileModel.create({
          userID: message.author.id,
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

    // Execute command

    try {
      command.execute(message, profileData, args, Discord, client);
    }
    catch (error) {
      console.error(error);
      message.reply('ocorreu um erro ao tentar executar este comando!');
    }
  },
};