'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    trim: true
  },
  email: {
    type: String,
  //  required: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String
  },
  image: {
    type: String,
    default: "https://www.sackettwaconia.com/wp-content/uploads/default-profile.png"
  },
  books: [{
    type: mongoose.Types.ObjectId,
    ref: 'Book'
  }]
});

module.exports = mongoose.model('User', schema);
