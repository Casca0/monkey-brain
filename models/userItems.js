const mongoose = require('mongoose');

const userItems = new mongoose.Schema({
  user_id: { type: String, require: true },
  item_id: { type: Number, require: true, default: '' },
  item_name: { type: String },
  item_useDescription: { type: String },
  amount: { type: Number, default: 0 },
});

const model = mongoose.model('UsersInventory', userItems);

module.exports = model;