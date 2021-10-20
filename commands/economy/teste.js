/* eslint-disable no-unused-vars */
const profileModel = require('../../models/profileSchema');
const shop = require('../../models/currencyShop');
module.exports = {
  name: 'teste',
  aliases: ['t'],
  async execute(message, profileData, args) {
    try {
      const all = await shop.find();
      console.log(all);
    }
    catch (err) {
      console.log(err);
    }
  },
};