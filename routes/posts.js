'use strict';

const { Router } = require("express");
const postRouter = new Router();
const Post = require("../models/posts");



postRouter.post("/add-post-reading", async (req, res, next) => {

  //console.log("I am at the add post reading route and this is my req body", req.body);

  const userId = req.session.user;

  try {
    await Post.create({
      title: req.body.title,
      content: req.body.content,
      user: userId,
      type: req.body.type
        }).then(post => {
      //console.log('post created', post);
      res.json({post})
      }).catch(err => {
        console.log("could not add post due to", err);
      });
  } catch (error) {
    next(error);
  }
});

postRouter.post("/add-post-remove-book", async (req, res, next) => {

//console.log('I am in the backend of the removed book post');

  const userId = req.session.user;

  try {
    await Post.create({
      title: req.body.title,
      content: req.body.content,
      user: userId,
      type: req.body.type
        }).then(post => {
      //console.log('post created in removed books', post);
      res.json({post})
      }).catch(err => {
        console.log("could not add post due to", err);
      });
  } catch (error) {
    next(error);
  }
});

postRouter.post("/get-posts", async (req, res, next) => {
  const userLoggedIn = req.body.followingUsers;
  //console.log(userLoggedIn);
try {
  await Post.find({'user': {$in: userLoggedIn} })
  .populate('user followingUser')
  .sort({time: -1})
  .exec()
  .then(posts => {
   // console.log('We got the posts');
   console.log('these are the posts!')
    res.json({posts});
  })
  .catch (error =>{
    console.log('Didnt get the posts', error);
    next(error)
  })
} catch(error) {
  console.log('Main error on getting the posts', error);
  next(error);
}})

postRouter.post("/add-following-post", async (req, res, next) => {
  
   const userId = req.session.user;
  // console.log('req.body in add following-post', req.body);
 
   try {
     await Post.create({
       content: req.body.content,
       user: userId,
       followingUser: req.body.data._id,
       type: 'follow'
         }).then(post => {
      // console.log('post created', post);
      // console.log('created post', post);
       res.json({post})
       }).catch(err => {
         console.log("could not add post due to", err);
       });
   } catch (error) {
     next(error);
   } 
 });

 postRouter.post("/add-post-podcast", async (req, res, next) => {

 // console.log("I am at the add post podcast route and this is my req body", req.body);
 
   const userId = req.session.user;
 
   try {
     await Post.create({
       title: req.body.title,
       content: req.body.content,
       user: userId,
       type: req.body.type
         }).then(post => {
      // console.log('post created', post);
       res.json({post})
       }).catch(err => {
         console.log("could not add post due to", err);
       });
   } catch (error) {
     next(error);
   }
 });
 


 postRouter.post("/add-post", async (req, res, next) => {

  // console.log("I am at the add post route and this is my req body", req.body);
 
   const userId = req.session.user;
 
   try {
     await Post.create({
       title: req.body.title,
       content: req.body.content,
       user: userId,
       type: req.body.type
         }).then(post => {
      // console.log('post created', post);
       res.json({post})
       }).catch(err => {
         console.log("could not add post due to", err);
       });
   } catch (error) {
     next(error);
   }
 });
 



module.exports = postRouter;
