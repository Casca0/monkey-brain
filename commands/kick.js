module.exports = {
  name:'kick',
  execute(message) {
    const member = message.mentions.users.first();
    message.channel.send(`Macaco joga uma banana em ${member}\nACERTO CRÍTICO!`);
    member.send('Macaco sentir sua falta, não pensar que banana machucar\nhttps://discord.gg/vxKhvWWSbq');
    member.kick();
  },
};