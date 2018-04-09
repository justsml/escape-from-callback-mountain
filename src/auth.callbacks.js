// CALLBACKS - NodeJS, Original Recipe
const {hashString} = require('./lib/crypto')
const users        = require('./lib/users')

function auth({username, password}, callback) {
  if (!username || username.length < 1) return callback(new Error('Invalid username.'))
  if (!password || password.length < 6) return callback(new Error('Invalid password.'))
  if (typeof callback !== 'function') throw new Error('Callback arg required!')

  hashString(password, function _hashPass(err, password) {
    if (err) return callback(err)
    users.model.findOne({username, password}, function _handleUser(err, results) {
      if (err) return callback(err)
      if (!results) {
        callback(new Error('No users matched. Login failed'))
      } else {
        callback(null, results)
      }
    })
  })
}

module.exports = {auth}
