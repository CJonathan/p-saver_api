let mongoose = require('mongoose');
let config = require('../config');

mongoose.connect(config.databaseUrl, (err, doc) => {
  if(!err) console.log('service connected to database');
});