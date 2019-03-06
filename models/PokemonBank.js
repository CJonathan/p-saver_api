const mongoose = require('mongoose');

const PokebankSchema = new mongoose.Schema({
  entry: Number,
  pokemon: {
    name: String,
    avatar: String,
    about: String,
    meta: String,
    types: Array
  },
  region: String,
  note: String,
  isCaught: Boolean,
  isNotCatchable: Boolean,
  nbCaught: Number,
  registrationDate: Date
}, {collection: 'pokebank'});

module.exports = mongoose.model('Pokebank', PokebankSchema);