import { Sequelize, DataTypes } from 'sequelize';
const { sequelize } = require('')

const User = sequelize.define('User', {
  id:
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});