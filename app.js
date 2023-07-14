require("dotenv").config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware');
const rootRouter = require('./routes/rootRouter');
const app = express();
const { userModel, postModel } = require('./models/models');
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
const sequelize = require('./models/db');

const start = async () => {
  console.log('Init application...');
  const {database, username, password, host, port} = sequelize.dialect.sequelize.config;
  console.log({database, username, password, host, port});
  const initDb = async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: true });
      console.log('DB connection has been established successfully.');
    } catch (err) {
      console.log('Unable to connect to the database:', err);
    };
  }
  await initDb();

  const generateTestData = async (req, res, next) => {
    for (let i = 0; i < 20; i++) {
      await userModel.create({email: String(Math.floor(Math.random()*100090997978978978)), password: Math.floor(Math.random()*1000)});
    }
    for (let i = 0; i < 20; i++) {
      await postModel.create({title: new Date().toDateString(), text: new Date().toDateString(), UserId: Math.floor((Math.random()*20)+1)});
    }
    if (req) {
      res.send('Data generated!')
    }
  }
  await generateTestData();

  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'upload')));
  app.get('/generate', generateTestData);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api', rootRouter);
  app.use(errorMiddleware);

  console.log('Init successfully');
  app.listen(process.env.PORT || 5000, () => console.log("Server listening on port " + process.env.PORT));
};

start()