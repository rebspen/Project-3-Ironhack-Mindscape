'use strict';

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const connectMongo = require('connect-mongo');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const basicAuthenticationDeserializer = require('./middleware/basic-authentication-deserializer.js');
const bindUserToViewLocals = require('./middleware/bind-user-to-view-locals.js');
const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const booksRouter = require('./routes/books');
const socialRouter = require('./routes/social-network');
const postRouter = require('./routes/posts');



const app = express();

app.use(express.static(join(__dirname, 'client/build')));
app.use(logger('dev'));
//app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 60 * 24 * 15,
      sameSite: 'lax',
      httpOnly: true
      // secure: process.env.NODE_ENV === 'production'
    },
    store: new (connectMongo(expressSession))({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 60 * 24 * 15
    })
  }));
app.use(basicAuthenticationDeserializer);
app.use(bindUserToViewLocals);

app.use('/', indexRouter);
app.use('/api/auth', authenticationRouter);
app.use('/api/books', booksRouter);
app.use('/api/social', socialRouter);
app.use('/api/posts', postRouter);
app.get("*", (req,res,next)=>{ res.sendFile(join(__dirname, 'client/build/index.html'))});



// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
