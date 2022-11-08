const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Comments = sequelize.define('comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
})

module.exports = { Comments }