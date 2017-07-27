const Sequelize, {DataTypes} = require('sequelize')
const sequelize = new Sequelize('sqlite:temp.sqlite')

module.exports = {DataTypes, sequelize}
