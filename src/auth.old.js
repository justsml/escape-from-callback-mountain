const {hashString}     = require('./lib/crypto')
const {auditLog}       = require('./lib/log')
const {connection}     = require('./lib/db')

function auth(username, password, callback) {
  if (!username || username.length < 4) { return callback(new Error('Invalid username. Required, 4 char minimum.')) }
  if (!password || password.length < 4) { return callback(new Error('Invalid password. Required, 4 char minimum.')) }
  if (!callback) { throw new Error('Callback arg required!') }

  connection.open(function _onConnected(err, {models}) {
    if (err) return callback(err)
    const {users} = models
    hashString(password, function _hashHandler(err, passHash) {
      if (err) return callback(err)
      users.findOne({username, password: passHash}, function _findHandler(err, results) {
        if (err) return callback(err)
        if (!results) {
          return callback(new Error('No users matched. Login failed'))
        }
        auditLog({event: 'login', username}, function _noOp() {/* do nothing */})
        callback(null, results)
      })
    })
  })
}
