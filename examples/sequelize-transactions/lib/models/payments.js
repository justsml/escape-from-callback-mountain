const {DataTypes, sequelize} = require('../db')

const Payments = module.exports = sequelize
.define('payments', {
  name: DataTypes.STRING(64),
  amount: DataTypes.DECIMAL(12, 2),
}, {
  timestamps: true,
  paranoid: false,
  freezeTableName: true,
});

module.exports = Payments
