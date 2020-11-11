const express = require('express');
const { Schema } = require('mongoose');
const router  = express.Router();
const Celeb = require('../models/celebrity');
const Movie = require('../models/movies');

router.get('/celebrities', (req, res, next) => {
  Celeb.find()
  //.populate('celebrity')
    .then((allTheMoviesFromDB) => {
      res.render('celebrities/index', {celebs: allTheMoviesFromDB});
    });
});

router.get('/celebrities/create', (req, res) => {
  res.render('celebrities/new');
});

router.post('/celebrities/create', (req, res) => {
  let {name, occupation, catchPhrase } = req.body;
  Celeb.create({
    name,
    occupation,
    catchPhrase
  }).then(() => {
    res.redirect('/celebrities');
  });
});

router.post('/celebrities/:Id/delete', (req, res) => {
  let celebId = req.params.Id;
  let {name, maxSpeed, propellers } = req.body;
  Celeb.findByIdAndDelete(celebId)
    .then(() => {
    res.redirect('/celebrities');
  });
  
});


router.get('/celebrities/:Id/edit', (req, res) => {
  let celebId = req.params.Id;
  Celeb.findById(celebId)
  .then((theCelebFound) => {
    res.render('celebrities/show', { celeb: theCelebFound});
  }).catch((err) => {
    res.render('error', { err });
  })
});

router.post('/celebrities/:Id/edit', (req, res) => {
  let celebId = req.params.Id;
  let {name, occupation, catchPhrase } = req.body;
  Celeb.findByIdAndUpdate(celebId, {
    name,
    occupation,
    catchPhrase
  }).then(() => {
    res.redirect('/celebrities');
  });
});


module.exports = router;