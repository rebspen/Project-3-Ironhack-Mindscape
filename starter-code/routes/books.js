'use strict';

const { Router } = require("express");
const booksRouter = new Router();
const Book = require("./../models/book");


//add book

booksRouter.post('/add-book', async (req, res, next) => {
  const { title, author, description, image } = req.body;
  const userId = req.session.user;
  try {
    const book = await Book.create({
     title,
     author,
     description,
     image,
     users: users.push(userId)
    });
    res.json({ book });
  } catch (error) {
    next(error);
  }
});

//find book 




module.exports = booksRouter;
