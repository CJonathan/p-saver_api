let Pokemon = require('../models/Pokemon');


//get names
//https://pokeapi.co/api/v2/pokemon-species/1/
// names: [].language.name = 'fr'

let pokemon = {
  entry: '1',
  pokemon: {
    name: 'bulbasaure',
    avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    about: 'Pokemon Temporel'
  },
  region: 'kanto',
  isCaught: false,
  nbCaught: 0,
  type: ['grass', 'poison'],
  registrationDate: Date(),
};

Pokemon.find({ entry: '1' }, (err, pokemons) => {
  if (!err && !pokemons.length) {
    Pokemon.create(pokemon);
  }
});