const express = require('express');
const { Schema } = require('mongoose');
const router  = express.Router();
const Celeb = require('../models/celebrity');
const Movie = require('../models/movies');

router.get('/movies', (req, res) => {
  //get books from Mongo and pass to this view
  Movie.find()
    .populate('celebrity')
    .then((allTheMovieFromDB) => {
      res.render('movies/index', {movies: allTheMovieFromDB});
    });
});

router.get('/movies/create', (req, res) => {
  Celeb.find()
  .then((allTheCelebsFromDB) => {
    res.render('movies/new', {celebs: allTheCelebsFromDB});
  })
});

router.post('/movies/create', (req, res) => {
  let {name, celebrities, rating } = req.body;
  Movie.create({
    name : name,
    celebrities: celebrities,
    rating: rating
  })
  .then(() => {
    res.redirect('/movies');
  });
});

router.post('/movies/:Id/delete', (req, res) => {
  let MovieId = req.params.Id;
  let {name, maxSpeed, propellers } = req.body;
  Movie.findByIdAndDelete(MovieId)
    .then(() => {
    res.redirect('/movies');
  });
  
});


router.get('/movies/:Id/edit', (req, res) => {
  let movieId = req.params.Id;
  Movie.findById(movieId)
  .populate('celebrity')
  .then((theMovieFound) => {
    //found the celeb
    Celeb.find()
      .then((allTheCelebritiesFromDB) => {
      res.render('movies/show', {movies: theMovieFound, celebs: allTheCelebritiesFromDB})
      })
      })
      .catch((err) => {
        res.render('error', { err });
      })
});

router.post('/movies/:Id/edit', (req, res) => {
  let movieId = req.params.Id;
  let {name, celebrities, rating } = req.body;
  Movie.findByIdAndUpdate(movieId, {
    name,
    celebrities,
    rating
  }).then(() => {
    res.redirect('/movies');
  });
});


module.exports = router;