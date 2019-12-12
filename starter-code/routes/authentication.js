'use strict';

const { Router } = require('express');
const router = new Router();
const passport = require('passport');

router.post(
  '/sign-up',
  passport.authenticate('local-sign-up', {
    successRedirect: '/private',
    failureRedirect: '/sign-up'
  })
);

router.post(
  '/sign-in',
  passport.authenticate('local-sign-in', {
    successRedirect: '/private',
    failureRedirect: '/sign-in'
  })
);

router.post('/sign-out', (req, res, next) => {
  req.logout();
  res.json({});
});

module.exports = router;
