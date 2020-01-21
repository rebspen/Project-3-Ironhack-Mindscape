"use strict";

const { Router } = require("express");
const booksRouter = new Router();
const Book = require("./../models/book");
const User = require("./../models/user");
const Podcast = require("./../models/podcast");
//add book

booksRouter.post("/add-book", async (req, res, next) => {
  const userId = req.session.user;
  try {
   // console.log('trying to add book in the backend');
    const book = await Book.create({
      title: req.body.volumeInfo.title,
      description: req.body.volumeInfo.description,
      image: req.body.volumeInfo.imageLinks.thumbnail,
      author: req.body.volumeInfo.authors[0],
      user: userId
    }).then(book => {
     // console.log('trying to add book in the backend-step 2');
      const bookId = book._id;
      res.json({book});
      return User.findByIdAndUpdate(userId, {
        $push: {
          books: bookId
        }
      }).then(user => {
        //console.log('trying to add book in the backend-step 3', user);
      }).catch(err => {
        console.log("could not update the book id in the user", err);
      });
    });
  } catch (error) {
    console.log('could add book to bookshelf due to ', error)
    next(error);
  }
});

//add podcast

booksRouter.post("/add-podcast", async (req, res, next) => {
  // console.log("I am at the add podcast route");
  // console.log("req-body", req.body);
  const userId = req.session.user;
  try {
    const podcast = await Podcast.create({
      title: req.body.Name,
      description: req.body.wTeaser,
      wUrl: req.body.wUrl,
      yUrl: req.body.yUrl,
      user: userId
    }).then(podcast => {
      const podId = podcast._id;
      //console.log("Book ID", podId);
      return User.findByIdAndUpdate(userId, {
        $push: {
          podcasts: podId
        }
      }).then(() => {
        res.json({podcast})
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
 // console.log("I am at the book delete route");
  const userId = req.session.user;
  const bookId = req.params.id;
  try {
    await Book.findByIdAndRemove(bookId).then(book => {
      User.findByIdAndUpdate(userId, {
        $pull: {
          books: bookId
        }
      }).then(() => {
        res.json({book})
      }).catch(err => {
        console.log("could not remove the book id from the user", err);
      });
    });
  } catch (error) {
    next(error);
  }
});

booksRouter.post("/poddelete/:id", async (req, res, next) => {
 // console.log("I am at the podcast delete route");
  const userId = req.session.user;
  const podId = req.params.id;
  try {
    await Podcast.findByIdAndRemove(podId).then(post => {
      return User.findByIdAndUpdate(userId, {
        $pull: {
          podcasts: podId
        }
      }).then(() => {
        res.json(post);
      }).catch(err => {
        console.log("could not remove the pod id from the user", err);
      });
    });
  } catch (error) {
    next(error);
  }
});

booksRouter.post("/viewer-add-book", async (req, res, next) => {
  //console.log("I am at the add book route for viewer");
 // console.log("req-body", req.body);
  const userId = req.session.user;
  try {
    await Book.create({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      author: req.body.author,
      user: userId
    }).then(book => {
      const bookId = book._id;
    //  console.log("Book ID", bookId);
      return User.findByIdAndUpdate(userId, {
        $push: {
          books: bookId
        }
      }).then(() =>{
        res.json({book})
      }).catch(err => {
        console.log("could not update the book id in the user", err);
      });
    });
  } catch (error) {
    next(error);
  }
});

booksRouter.post("/viewer-add-podcast", async (req, res, next) => {
  // console.log("I am at the add podcast route for viewer");
  // console.log("req-body", req.body);
  const userId = req.session.user;
  try {
    const podcast = await Podcast.create({
      title: req.body.title,
      description: req.body.wTeaser,
      yUrl: req.body.yUrl,
      wUrl: req.body.wUrl,
      user: userId
    }).then(podcast => {
      const podId = podcast._id;
     // console.log("Pod ID", podId);
      return User.findByIdAndUpdate(userId, {
        $push: {
          podcasts: podId
        }
      }).then(() => {
        res.json({podcast});
      }).catch(err => {
        console.log("could not update the pod id in the user", err);
      });
    });
  } catch (error) {
    next(error);
  }
});

//find users book

booksRouter.post("/get-books/:id", async (req, res, next) => {
 // console.log("I am at the get books route");
  const userId = req.params.id;
  //console.log("Id of the books we are pulling", userId);
  try {
    const user = await User.findById(userId).populate("books");
    res.json({ user });
  } catch (error) {
    next(error);
  }
});


//find user podcasts

booksRouter.post("/get-podcasts/:id", async (req, res, next) => {
 // console.log("I am at the get podcast route");
  const userId = req.params.id;
  //console.log("Id of the podcasts we are pulling", userId);
  try {
    const user = await User.findById(userId).populate("podcasts");
    res.json({ user });
  } catch (error) {
    next(error);
  }
});


//update book

booksRouter.patch("/change-status/:id", async (req, res, next) => {
  //console.log("I am at the change status route", req.params.id);
  const bookId = req.params.id;
 // console.log("id", bookId);
  try {
    await Book.findById(bookId).then(book => {
    //  console.log("the book we are changing status - ", book);
      let result;
      if (book.status === "Saved") {
        result = "Reading";
      } else {
        result = "Finished";
      }
      return Book.findByIdAndUpdate(book._id, {
        status: result
      }).then(() => {
        res.json({book});
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
