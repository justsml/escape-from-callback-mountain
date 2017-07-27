const {DataTypes, sequelize} = require('../db')

const Users = module.exports = sequelize
.define('users', {
  firstName: DataTypes.STRING(64),
  lastName: DataTypes.STRING(64),
  email: DataTypes.STRING(128),
}, {
  timestamps: true,
  paranoid: false,
  freezeTableName: true,
})

module.exports = Users
