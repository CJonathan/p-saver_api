let express = require('express');
let port = process.env.PORT || 3200;
let app = express();

require('./db/db');

const api = express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use('/api/v1', api);

let PokemonController = require('./controllers/Pokemon');
let PokemonBankController = require('./controllers/PokemonBank');

api.use('/pokemon', removeUndefKeys, PokemonController);
api.use('/bank', removeUndefKeys, PokemonBankController);

function removeUndefKeys(req, res, next) {
  if(req.body) {
    let data = req.body;
    Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);
  }
  next();
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port: ${port}`);
});
