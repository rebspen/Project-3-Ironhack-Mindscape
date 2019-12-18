'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  author: {
    type: String
  },
  description: {
    type: String
  },
  image: String,
  status: {
    type: String,
    enum: ["Saved", "Reading", "Finished"],
    default: "Saved"
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

module.exports = mongoose.model('Book', schema);
