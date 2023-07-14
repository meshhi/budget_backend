const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const userModel = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true},
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: true, defaultValue: 'user' },
});

const postModel = sequelize.define('Post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: false },
  text:{ type: DataTypes.STRING, allowNull: false, unique: false },
  media:{ type: DataTypes.STRING, allowNull: true, unique: false },
});

const transactionModel = sequelize.define('Transaction', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: false },
  text:{ type: DataTypes.STRING, allowNull: false, unique: false },
  isIncome:{ type: DataTypes.BOOLEAN, allowNull: true, unique: false },
});

userModel.hasMany(postModel);
postModel.belongsTo(userModel);

userModel.hasMany(transactionModel);
transactionModel.belongsTo(userModel);

module.exports = {
  userModel,
  postModel,
  transactionModel
};