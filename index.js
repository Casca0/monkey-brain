const fs = require('fs');
const Discord = require('discord.js');
require('dotenv/config');
const token = 'ODQwMjIxOTA3NjIyMTY2NTc5.YJVDoQ.7uFimz3_91sX4lg8D3YKrl7GEI8';
const mongoose = require('mongoose');

// CLient init

const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
});
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.aliases = new Discord.Collection();

client.login(token);

// Command handler

const commandFolders = fs.readdirSync('./commands');

for(const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for(const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
    if (command.aliases) {
      command.aliases.forEach(alias => {
        client.commands.set(alias, command);
      });
    }
  }
}

// Event handler

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for(const file of eventFiles) {
  const event = require(`./events/${file}`);
  if(event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  }
  else {
    client.on(event.name, (...args) => event.execute(...args, client, Discord));
  }
}

// Database

mongoose.connect(process.env.MONGO_TOKEN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('AAAAAAAAAAA CONECTEI AO BANCO MIZERA');
}).catch((err) => {
  console.log(err);
});


/*
      __
 ____|  |____
 ------------
  |  O  O  |
  |   <    |
  |  ----  |
  |________|

GOD MARCELO HERE
I'M WATCHING YOU

*/
