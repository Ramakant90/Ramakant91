const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User'); // यदि User model है

const XsrPing = sequelize.define('XsrPing', {
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = XsrPing;
