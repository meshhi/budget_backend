const { Sequelize, DataTypes } = require('sequelize');
// const { sequelize } = require('')

const userModel = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, },
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
});

module.exports = userModel;