require("dotenv").config()

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware');
const rootRouter = require('./routes/rootRouter');
const app = express();

// init db
const sequelize = require('./models/db');
const models = require('./models/models');
;(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('DB connection has been established successfully.');
  } catch (err) {
    console.log('Unable to connect to the database:', err);
  };
})();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', rootRouter);
app.use(errorMiddleware);

app.listen(process.env.PORT || 5000, () => console.log("Server listening on port " + process.env.PORT));
module.exports = app;
