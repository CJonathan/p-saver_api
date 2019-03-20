const express = require('express');
const router = express.Router();

const Pokemon = require('../models/Pokemon');


//get
router.get('/', (req, res) => {
  Pokemon.find({region: req.query.region}).sort('entry').exec((err, pokemons) => {
    if(err) return res.status(500).send('Some went wrong');
    return res.status(200).json({ pokemons, region: req.query.region });
  });
});

//post
router.post('/', (req, res) => {
  Pokemon.find({ entry: req.body.entry }, (err, pokemons) => {
    if(!err && !pokemons.length) {
      Pokemon.create(req.body)
             .then(() => {
               res.status(201).send();
             });
    } else {
      return res.status(400).send("Pokemon already registred");
    }
  });
});

router.get('/:entry', (req, res) => {
  Pokemon.findOne({ entry: req.params.entry }, (err, pokemom) => {
    if(err) return res.status(500).send('Some went wrong');
    return res.status(200).json({ pokemom, region: pokemom.region });
  });
});

//patch
router.patch('/:_id', (req, res) => {
  let data = req.body;
  Pokemon.findOneAndUpdate({ _id: req.params._id }, data, { new: true },
    (err, pokemon) => {
      if(err) return res.status(500).send(err);
      return res.status(200).json({ pokemon });
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