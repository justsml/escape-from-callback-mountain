/*****
This is inspired by examples I found googling for (roughly) "NodeJS code user password hash"
******/

const {hashString}     = require('./lib/crypto')
const {auditLog}       = require('./lib/log')
const {connection}     = require('./lib/db')

function auth(username, password, callback) {
  if (!username || username.length < 4) { return callback(new Error('Invalid username. Required, 4 char minimum.')) }
  if (!password || password.length < 4) { return callback(new Error('Invalid password. Required, 4 char minimum.')) }
  if (!callback) { return callback(new Error('Callback arg required!')) }
  // Get db connection, hopefully cached? Pooled? - returns models
  connection.open(function _onConnected(err, {models}) {
    if (err) return callback(err)
    // Get reference to `users` query interface
    const {users} = models
    // Hash the password before querying for user
    hashString(password, function _hashHandler(err, passHash) {
      if (err) return callback(err)
      users.findOne({username, passHash}, function _findHandler(err, results) {
        if (err) return callback(err)
        if (!results) {
          return callback(new Error('No users matched. Login failed'))
        }
        // Before returning results, make a non-blocking call to logging function `auditLog`
        auditLog({event: 'login', username}, function _noOp() {/* do nothing */})
        callback(null, results)
      })
    })
  })
}
