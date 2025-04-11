const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // ✅ सटीक named import

const Live = sequelize.define('Live', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  streamUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isLive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = Live;
