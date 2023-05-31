require("dotenv").config()

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware');
const rootRouter = require('./routes/rootRouter');
const app = express();

// swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Welbex API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js', './routes/authorized/routers/*.js', './routes/free/routers/*.js'], // files containing annotations as above
};
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = swaggerJSDoc(options);

// init db
const sequelize = require('./models/db');
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
app.use(express.static(path.join(__dirname, 'upload')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', rootRouter);
app.use(errorMiddleware);

app.listen(process.env.PORT || 5000, () => console.log("Server listening on port " + process.env.PORT));
module.exports = app;
