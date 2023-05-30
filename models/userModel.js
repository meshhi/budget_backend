import { Sequelize, DataTypes } from 'sequelize';
const { sequelize } = require('')

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, },
  username: DataTypes.STRING,
  login: DataTypes.STRING,
});