const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Notification = sequelize.define('Notification', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false, // जिसको यह notification दिखेगा
  },
  type: {
    type: DataTypes.STRING, // "video", "comment", etc.
    allowNull: false,
  },
  fromUserId: {
    type: DataTypes.INTEGER,
    allowNull: false, // किसने trigger किया
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: true,
});

module.exports = Notification;
