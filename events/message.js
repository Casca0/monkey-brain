const { prefix } = require('../config.json');
module.exports = {
  name:'message',
  execute(message, client) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    // if (!command) return;

    try {
      command.execute(message, args);
    // eslint-disable-next-line brace-style
    } catch (error) {
      console.error(error);
      message.reply('ocorreu um erro ao tentar executar este comando!');
    }
  },
};