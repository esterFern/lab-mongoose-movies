'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const data = require('../bin/seeds.js');
const Celebrity = require('../models/Celebrity');

mongoose.connect('mongodb://localhost/movies', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

// CREATE DATABASE

// Celebrity.insertMany(data)
//   .then(result => {
//     console.log(result);
//     mongoose.connection.close();
//   })
//   .catch(err => console.log(err));

/* GET home page. */

router.get('/index', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render('celebrities/index', { celebrities });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
