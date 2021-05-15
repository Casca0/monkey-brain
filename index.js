const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Ready!');
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
  client.user.setActivity('b a n a n a');
});

client.on('message', message => {
  console.log(message.content);
});

client.login(config.token);