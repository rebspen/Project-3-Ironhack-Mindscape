"use strict";

const { Router } = require("express");
const booksRouter = new Router();
const Book = require("./../models/book");
const User = require("./../models/user");

//add book

booksRouter.post("/add-book", async (req, res, next) => {
  console.log("I am at the add book route");
  console.log("req-body", req.body);
  const userId = req.session.user;
  try {
    const book = await Book.create({
      title: req.body.volumeInfo.title,
      description: req.body.volumeInfo.description,
      image: req.body.volumeInfo.imageLinks.thumbnail,
      author: req.body.volumeInfo.authors[0],
      user: userId
    }).then(book => {
      const bookId = book._id;
      console.log("Book ID", bookId);
      return User.findByIdAndUpdate(userId, {
        $push: {
          books: bookId
        }
      }).catch(err => {
        console.log("could not update the book id in the user", err);
      });
    });
  } catch (error) {
    next(error);
  }
});

//delete book post and Id from book array in user

booksRouter.post("/delete/:id", async (req, res, next) => {
  console.log("I am at the book delete route");
  const userId = req.session.user;
  const bookId = req.params.id;
  try {
    await Book.findByIdAndRemove(bookId).then(() => {
      User.findByIdAndUpdate(userId, {
        $pull: {
          books: bookId
        }
      }).catch(err => {
        console.log("could not remove the book id from the user", err);
      });
    });
  } catch (error) {
    next(error);
  }
});

booksRouter.post("/viewer-add-book", async (req, res, next) => {
  console.log("I am at the add book route for viewer");
  console.log("req-body", req.body);
  const userId = req.session.user;
  try {
    const book = await Book.create({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      author: req.body.author,
      user: userId
    }).then(book => {
      const bookId = book._id;
      console.log("Book ID", bookId);
      return User.findByIdAndUpdate(userId, {
        $push: {
          books: bookId
        }
      }).catch(err => {
        console.log("could not update the book id in the user", err);
      });
    });
  } catch (error) {
    next(error);
  }
});

//find users book

booksRouter.post("/get-books/:id", async (req, res, next) => {
  console.log("I am at the get books route");
  const userId = req.params.id;
  console.log("Id of the books we are pulling", userId);
  try {
    const user = await User.findById(userId).populate("books");
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

//update book

booksRouter.patch("/change-status/:id", async (req, res, next) => {
  console.log("I am at the change status route", req.params.id);
  const bookId = req.params.id;
  console.log("id", bookId);
  try {
    await Book.findById(bookId).then(book => {
      console.log("the book we are changing status - ", book);
      let result;
      if (book.status === "Saved") {
        result = "Reading";
      } else {
        result = "Finished";
      }
      return Book.findByIdAndUpdate(book._id, {
        status: result
      }).catch(err => {
        console.log("could not update the book id in the user", err);
      });
    });
  } catch (error) {
    next(error);
  }
});

//find book

module.exports = booksRouter;
