module.exports = {
  name:'bonk',
  description: 'Dê bonk em alguém (ADMIN).',
  usage: '?bonk <user>',
  execute(message) {
    const user = message.mentions.users.first();
    if(user) {
      const member = message.guild.members.resolve(user);
      if(message.member.permissions.has('ADMINISTRATOR') || message.member.roles.cache.has('829091854842724372')) {
        try {
          member.kick();
          message.channel.send(`Macaco jogou uma banana em ${member}!\nACERTO CRÍTICO!`);
        }
        catch (error) {
          message.channel.send(`Você não tem permissão para usar este comando! ${message.author}`);
        }
      }
      else {
        message.channel.send(`Você não tem permissão para usar este comando! ${message.author}`);
      }
    }
    else {
      message.channel.send('Você precisar marcar alguém para poder expulsá-lo!');
    }
  },
};