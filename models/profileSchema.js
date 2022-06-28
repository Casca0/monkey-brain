const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  serverID: { type: String, require: true },
  coins: { type: Number, default: 1000, min: 0 },
  bank: { type: Number, min: 0 },
  macetanciaCounter: { type: Number },
  walletName: { type: String, default: 'Extrato' },
  walletColor: { type: String, default: '#32a84a' },
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;