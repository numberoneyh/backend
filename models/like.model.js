const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Like = sequelize.define('like', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  like: { type: DataTypes.INTEGER, allowNull: false },
})

module.exports = { Like }