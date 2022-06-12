const mongoose = require('mongoose');

const prefixSchema = new mongoose.Schema({
  prefix: { type: String, require: true, unique: true, default: '?' },
});

const model = mongoose.model('CommandPrefix', prefixSchema);

module.exports = model;