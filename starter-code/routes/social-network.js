'use strict';

const { Router } = require("express");
const socialRouter = new Router();
const User = require("./../models/user");

socialRouter.patch('/add-follower', async (req, res, next) => {
const data = req.body;
const userLoggedIn = req.body.userLoggedIn;
const profileId = req.body.profileId;
try {
User.findByIdAndUpdate(userLoggedIn, {
  $push: {
    followingUsers: profileId 
}
}).exec()
.then (user => {
  console.log('You are now following a new user, check the array', user);
  return User.findByIdAndUpdate(profileId, {
    $push: {
      beingFollowedUsers: userLoggedIn
  }
  }).exec()
  .then(user => {
    console.log('You are now being followed by someone new, check the array', user)
  });
})
.catch (err => {
  console.log('We couldnt add this user to your following array due to ', err)
});
} catch (error) {
  console.log('We couldnt add this user to your following array due to ', error);
  next(error);
}
});

socialRouter.get('/user-list', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ users });
  }
catch (error) {
  console.log('not possible to find list of users', error);
  next(error);
}
});

module.exports = socialRouter;
