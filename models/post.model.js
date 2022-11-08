const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Post = sequelize.define('post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  like: { type: DataTypes.INTEGER, defaultValue: 0 },
  tags: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  img: { type: DataTypes.STRING, defaultValue: 'post.jpg' },
})

module.exports = { Post }