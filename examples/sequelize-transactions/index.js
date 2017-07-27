const {sequelize} = require('./lib/db')

// Call 3 'steps' - all inside a sequelize transaction:
execTransaction(t => Promise.resolve()
    .then(_addUser.bind(null, t))
    .then(_addSibling.bind(null, t))
    .then(_addPayment.bind(null, t))
)

function _addUser(t, {firstName, lastName}) {
  return User.create({ firstName, lastName }, {transaction: t})
}
function _addSibling(t, user) {
  return user.addSibling({ firstName: 'Lisa', lastName: 'Simpson' }, {transaction: t})
}
function _addPayment(t, user) {
  return user.addPayment({amount: -10000, name: 'ballin'}, {transaction: t})
}
// Common util function, `fn` must be passed a transaction instance
function execTransaction(fn) {
  let t
  return sequelize.transaction()
    .then(txn => {t = txn; return txn})
    .then(fn)
    .then(() => t.commit())
    .catch(err => {
      console.error('ERROR: execTransaction Failed! ', err)
      return t.rollback()
    })
}

