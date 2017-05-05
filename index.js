/*****
This was originally inspired by examples I found googling for (roughly) "NodeJS code user password hash"

Initial Ver:        https://github.com/justsml/escape-from-callback-mountain/commit/f828e863ee04df5b3f7f4f4307681bb3fde5285a?diff=unified
All commits:        https://github.com/justsml/escape-from-callback-mountain/commits/master
PRs Show Refactor:  https://github.com/justsml/escape-from-callback-mountain/pulls?utf8=%E2%9C%93&q=is%3Apr

******/

const Promise          = require('bluebird')
const {hashString}     = Promise.promisify(require('./lib/crypto'))
const {auditLog}       = Promise.promisify(require('./lib/log'))
const {connection}     = Promise.promisify(require('./lib/db'))

function authValidated({username, password}) {
  if (!username || username.length < 4) { return new Error('Invalid username. Required, 4 char minimum.') }
  if (!password || password.length < 4) { return new Error('Invalid password. Required, 4 char minimum.') }
  return {username, password}
}

function auth({username, password}) {
  let users = null;
  
  return Promise
    .resolve({username, password})
    .catch(err => console.error('Failed auth!', err))
    .then(authValidate)
    .then(() => {
      connection.open(_onConnected)
    })
  
  function _findHandler(err, results) {
    if (err) return callback(err)
    if (!results) {
      return callback(new Error('No users matched. Login failed'))
    }
    // Before returning results, make a non-blocking call to logging function `auditLog`
    auditLog({event: 'login', username}, function _noOp() {/* do nothing */})
    callback(null, results)
  }
  
  function _hashHandler(err, passHash) {
    if (err) return callback(err)
    users.findOne({username, passHash}, _findHandler)
  }
  
  function _onConnected(err, {models}) {
    if (err) return callback(err)
    users = models.users
    hashString(password, _hashHandler)
  }
  
}
