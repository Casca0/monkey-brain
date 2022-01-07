/* eslint-disable no-unused-vars */
const profileModel = require('../../models/profileSchema');
const shop = require('../../models/shopItems.js');
module.exports = {
  name: 'teste',
  aliases: ['t'],
  async execute(message, profileData, args) {
    try {
      const teste = args.pop();
      // if (isNaN(parseInt(teste)))
      console.log(parseInt(teste));
      // const item = shop.items.filter(items => { return items.name == args.join(' ').toLowerCase(); });
      // console.log(item[0].useDescription);
    }
    catch (err) {
      console.log(err);
      return;
    }
  },
};