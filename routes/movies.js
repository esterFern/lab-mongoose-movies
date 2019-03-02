'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('../models/Movie');

mongoose.connect('mongodb://localhost/movies', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render('movies/index', { movies });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { title, genre, plot } = req.body;
  const movie = { title, genre, plot };
  try {
    await Movie.create(movie);
    res.redirect('/movies');
  } catch (error) {
    next(error);
  };
});

router.get('/new', (req, res, next) => {
  res.render('movies/new');
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    res.render('movies/show', { movie });
  } catch (error) {
    next(error);
  }
});

router.post('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot } = req.body;
  const movie = { title, genre, plot };
  try {
    await Movie.findByIdAndUpdate(id, movie);
    res.redirect('/movies');
  } catch (error) {
    next(error);
  }
});

router.get('/:id/edit', async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    res.render('movies/edit', { movie });
  } catch (error) {
    next(error);
  };
});

router.post('/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  try {
    await Movie.findByIdAndDelete(id);
    res.redirect('/movies');
  } catch (error) {
    next(error);
  };
});

module.exports = router;
