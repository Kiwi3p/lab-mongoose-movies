// bin/seeds.js
const mongoose = require('mongoose');
const Celeb = require('../models/celebrity.js');
const DB_NAME = 'celeb-data';
mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const celebs = [
  {
    name: 'Jon Depp',
    occupation:
      'Diamond Jim impersonator',
    catchPhrase: 'bonjour'
  },
  {
    name: 'Whoopsie Goldberg',
    occupation:
      'Reality star',
    catchPhrase: 'Whoopsie!'
  },
  {
    name: 'Ben Hur',
    occupation:
      'Old man',
    catchPhrase: 'Silence'
  }
];
Celeb.create(celebs)
  .then(celebsFromDB => {
    console.log(`Created ${celebsFromDB.length} celebs`);
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating celebs from the DB: ${err}`));