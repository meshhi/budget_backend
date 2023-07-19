const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const userModel = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true},
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: true, defaultValue: 'user' },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

const postModel = sequelize.define('post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: false },
  text:{ type: DataTypes.STRING, allowNull: false, unique: false },
  media:{ type: DataTypes.STRING, allowNull: true, unique: false },
},
{
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

const transactionModel = sequelize.define('transaction', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: false },
  text:{ type: DataTypes.STRING, allowNull: false, unique: false },
  summary:{ type: DataTypes.INTEGER, allowNull: false, unique: false },
  is_income:{ type: DataTypes.BOOLEAN, allowNull: true, unique: false },
},
{
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

const categoryModel = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: false },
},
{
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

userModel.hasMany(postModel, {foreignKey: 'user_id'});
postModel.belongsTo(userModel, {foreignKey: 'user_id'});

userModel.hasMany(transactionModel, {foreignKey: 'user_id'});
transactionModel.belongsTo(userModel, {foreignKey: 'user_id'});

categoryModel.hasOne(transactionModel, {foreignKey: 'category_id'});
transactionModel.belongsTo(categoryModel, {foreignKey: 'category_id'});

module.exports = {  
  userModel,
  postModel,
  transactionModel,
  categoryModel
};