const mongoose = require('mongoose');

const currencyShop = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  item_id: { type: Number, require: true, unique: true },
  cost: { type: Number, require: true },
});

const model = mongoose.model('CurrencyShop', currencyShop);

module.exports = model;