const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware');
const rootRouter = require('./routes/rootRouter');

// init db
const sequelize = require('./models/db');
const models = require('./models/models');
;(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('DB connection has been established successfully.');
  } catch (err) {
    console.log('Unable to connect to the database:', err);
  };
})();

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', rootRouter);

app.use(errorMiddleware);

module.exports = app;
