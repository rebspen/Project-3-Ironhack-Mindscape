'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String
  },
  yUrl: String,
  wUrl: String,
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

module.exports = mongoose.model('Podcast', schema);
