const express = require('express');
const router = express.Router();

const Pokemon = require('../models/Pokemon');
const PokemonBank = require('../models/PokemonBank');

//get bank
router.get('/', (req, res) => {
  PokemonBank.find({ region: req.query.region }).sort('entry').exec((err, pokemons) => {
    if(err) return res.status(500).send('Some went wrong');
    return res.status(200).json({ pokemons, region: req.query.region });
  });
});

router.get('/count', (req, res) => {
  PokemonBank.count({}, (err, totalEntry) => {
    if(err) return res.status(500).send('Some went wrong');
    PokemonBank.count({ isCaught: true }, (err, totalCaught) => {
      if(err) return res.status(500).send('Some went wrong');
      return res.status(200).json({ totalEntry, totalCaught });
    });
  });

});

//get entry
router.get('/:entry', (req, res) => {
  Pokemon.findOne({ entry: req.params.entry }, (err, pokemom) => {
    if(err) return res.status(500).send('Some went wrong');
    return res.status(200).json({ pokemom, region: pokemom.region });
  });
});

//post bank
router.post('/', (req, res) => {
  PokemonBank.find({ entry: req.body.entry }, (err, pokemons) => {
    if(!err && !pokemons.length) {
      PokemonBank.create(req.body)
                 .then(() => {
                   res.status(201).send();
                 });
    } else {
      return res.status(400).send("Pokemon already registred");
    }
  });
});

//patch
router.patch('/:_id', (req, res) => {
  let data = req.body;
  PokemonBank.findOneAndUpdate({ _id: req.params._id }, data, { new: true },
    (err, pokemon) => {
      if(err) return res.status(500).send(err);
      PokemonBank.count({isCaught: true}, (err, totalCaught) => {
        if(err) return res.status(207).json({ pokemon, error: { message: 'Count undisponible' } });
        return res.status(200).json({ pokemon, totalCaught });
      })

    });
});

//delete
router.delete("/:_id", (req, res) => {
  Pokemon.deleteOne({ _id: req.params._id }, (err) => {
    if(err) res.status(500).send(err);
    return res.status(204).send("Resources marked as deleted");
  });
});

module.exports = router;