const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  content: {
    type: String,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  type: {
    type:String,
    enum: ['book', 'podcast', 'follow'],
    default: 'book'
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  followingUser: {
    type: mongoose.Types.ObjectId,
    ref: 'User' 
  },
  time : { type : Date, default: Date.now }
});

const Post = mongoose.model('Post', schema);

module.exports = Post;