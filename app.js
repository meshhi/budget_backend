var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const errorController = require('./controllers/errorController');

// routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

// init db
const sequelize = require('./models/db');
const models = require('./models/models');
;(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('DB connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', error);
  };
})();

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
// error handler
app.use(errorController.handleError);

module.exports = app;
