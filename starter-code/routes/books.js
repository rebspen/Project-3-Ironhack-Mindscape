'use strict';

const { Router } = require("express");
const booksRouter = new Router();
const Book = require("./../models/book");


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
     users: userId
    });
    res.json({ book });
  } catch (error) {
    next(error);
  }
});

//find book 




module.exports = booksRouter;
