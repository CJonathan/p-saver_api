const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
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
}, {collection: 'pokedex'});

module.exports = mongoose.model('Pokemon', PokemonSchema);