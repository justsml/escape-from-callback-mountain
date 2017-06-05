const express     = require('express');
const logger      = require('morgan');
const bodyParser  = require('body-parser');
// const cookieParser = require('cookie-parser');

const app = module.exports = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(500).send({
    message: err.message,
    error: err
  });
});


module.exports = app;
