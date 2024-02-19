const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey: true
  },
  user: {
    type: DataTypes.STRING
    
  },
  password: {
    type: DataTypes.STRING
  }
},{
  timestamps:false
});

module.exports = User;