const fs = require('fs');
const Discord = require('discord.js');
require('dotenv/config');
const token = process.env['CLIENT_TOKEN'];
const mongoose = require('mongoose');
const currencyShop = require('./models/currencyShop');


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
  console.log('AAAAAAAAAAA CONECTEI');
}).catch((err) => {
  console.log(err);
});

(async () => {
  const shopInfo = await currencyShop.find({ item_id: 1 });
  if (!shopInfo) {
    const shop = await currencyShop.create({
      name: 'banana',
      item_id: 1,
      cost: 1000,
    });
    shop.save();
  }
  else {
    return console.log('Esse item já existe');
  }
})();

// Server

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);

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
