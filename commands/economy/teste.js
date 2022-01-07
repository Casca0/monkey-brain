/* eslint-disable no-unused-vars */
const profileModel = require('../../models/profileSchema');
const shop = require('../../models/shopItems.js');
module.exports = {
  name: 'teste',
  aliases: ['t'],
  async execute(message, profileData, args) {
    try {
      console.log(message.author);
    }
    catch (err) {
      console.log(err);
      return;
    }
  },
};