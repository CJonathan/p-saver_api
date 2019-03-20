const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
  entry: Number,
  region: String,
  note: String,
  isCaught: Boolean,
  isNotCatchable: Boolean,
  nbCaught: Number,
  registrationDate: Date,
  pokemon: {
    name: String,
    avatar: String,
    about: String,
    meta: String,
    types: Array
  },
}, {collection: 'pokedex'});

module.exports = mongoose.model('Pokemon', PokemonSchema);