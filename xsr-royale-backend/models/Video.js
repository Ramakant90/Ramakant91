const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Video = sequelize.define('Video', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  dislikes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  comments: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'general',
  },
  reports: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  uploaderId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Video;

