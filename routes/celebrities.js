'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');

mongoose.connect('mongodb://localhost/movies', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

router.get('/', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render('celebrities/index', { celebrities });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const celebrity = { name, occupation, catchPhrase };
  try {
    await Celebrity.create(celebrity);
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  };
});

router.get('/new', (req, res, next) => {
  res.render('celebrities/new');
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebrity = await Celebrity.findById(id);
    res.render('celebrities/show', { celebrity });
  } catch (error) {
    next(error);
  }
});

router.post('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;
  const celebrity = { name, occupation, catchPhrase };
  try {
    await Celebrity.findByIdAndUpdate(id, celebrity);
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  }
});

router.get('/:id/edit', async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebrity = await Celebrity.findById(id);
    res.render('celebrities/edit', { celebrity });
  } catch (error) {
    next(error);
  };
});

router.post('/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  try {
    await Celebrity.findByIdAndDelete(id);
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  };
});
module.exports = router;
