const fs = require('fs');
const Discord = require('discord.js');
require('dotenv/config');
const token = process.env['CLIENT_TOKEN'];
const mongoose = require('mongoose');
const currencyShop = require('./models/currencyShop');
const items = require('./models/shopItems');


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

(() => {
  for (let i = 0; i < items.length; i++) {
    console.log(items[i].name);
    (async () => {
      const shopInfo = await currencyShop.findOne({ item_id: items[i].itemID });
      if(!shopInfo) {
        const shop = await currencyShop.create({
          name: items[i].name,
          item_id: items[i].itemID,
          cost: items[i].cost,
        });
        shop.save();
      }
      else {
        return console.log('Os itens com estes IDs já estão presentes na loja : \n ID : ' + items[i].itemID + ', ');
      }
    })();
  }
})();

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
