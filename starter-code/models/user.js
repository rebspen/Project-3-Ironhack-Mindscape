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
    default: "https://res.cloudinary.com/dgmvfq29c/image/upload/v1576260656/project-3-ironhack/default_picture_qtbqve.png"
  },
  books: [{
    type: mongoose.Types.ObjectId,
    ref: 'Book'
  }],
  podcasts: [{
    type: mongoose.Types.ObjectId,
    ref: 'Podcast'
  }],
  followingUsers: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }],
  beingFollowedUsers: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('User', schema);
