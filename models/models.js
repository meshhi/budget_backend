const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const userModel = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: true },
  role: { type: DataTypes.STRING, allowNull: true },
});

const postModel = sequelize.define('Post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: true },
});

module.exports = {
  userModel,
  postModel
};

userModel.hasMany(postModel);
postModel.belongsTo(userModel);