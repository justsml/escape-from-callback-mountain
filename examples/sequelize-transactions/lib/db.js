const Sequelize   = require('sequelize')
const {DataTypes} = Sequelize
const sequelize   = new Sequelize('sqlite:temp.sqlite')

module.exports    = {DataTypes, sequelize}
