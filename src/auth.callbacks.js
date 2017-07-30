// EXAMPLE: CALLBACKS
const {hashString}     = require('./lib/crypto')
const {logEvent}       = require('./lib/log')
const {getModels}      = require('./lib/db')

function auth(username, password, callback) {
  if (!username || username.length < 1) return callback(new Error('Invalid username.'))
  if (!password || password.length < 6) return callback(new Error('Invalid password.'))
  if (!callback) { throw new Error('Callback arg required!') }

  getModels(function _models(err, models) {
    if (err) return callback(err)
    const {users} = models
    hashString(password, function _hashed(err, hash) {
      if (err) return callback(err)
      users.findOne({username, password: hash}, function _find(err, user) {
        if (err) return callback(err)
        if (!user) {
          return callback(new Error('No users matched. Login failed'))
        }
        logEvent({event: 'login', username}, function _noOp() {/* do nothing */})
        callback(null, user)
      })
    })
  })
}

module.exports = {auth}
