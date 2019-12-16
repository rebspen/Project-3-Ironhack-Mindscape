'use strict';

const { Router } = require("express");
const booksRouter = new Router();
const Book = require("./../models/book");
const User = require("./../models/user");

//add book

booksRouter.post('/add-book', async (req, res, next) => {
  console.log("I am at the add book route");
  console.log("req-body", req.body);
  const userId = req.session.user;
  try {
    const book = await Book.create({
      title : req.body.volumeInfo.title,
      description: req.body.volumeInfo.description,
      image: req.body.volumeInfo.imageLinks.thumbnail,
      author: req.body.volumeInfo.authors[0],
      user: userId
    })
    .then(book => { 
      const bookId = book._id;
      console.log("Book ID", bookId);
      return User.findByIdAndUpdate(userId, {
        $push : {
          books: bookId
        }
      })
    .catch (err => {
      console.log("could not update the book id in the user", err);
    }); 
    });
    } catch (error) {
      next(error);
    }
  });

//find users book 

booksRouter.post('/get-books', async (req, res, next) => {
  console.log("I am at the get books route");
  const userId = req.session.user;
  console.log("id", userId);
  try {
    const user = await User.findById(userId)
    .populate('books');
    console.log("books", user.books);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});


//find book 




module.exports = booksRouter;
