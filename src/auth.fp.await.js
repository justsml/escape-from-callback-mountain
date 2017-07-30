// EXAMPLE: FUNCTIONAL PROMISES
const Promise           = require('bluebird')
const {hashString}      = require('./lib/crypto')
const {logEventAsync}   = require('./lib/log')
const {getModel}        = require('./lib/db')

module.exports = {auth}

async function auth({username, password}) {
  if (_isInputValid({username, password})) {
    logEventAsync({event: 'login', username})()
    const user = await _loginUser({username, password})
    if (user && user._id) {
      return user
    }
    throw new Error('User Not found!')
  }
}

async function _loginUser({username, password}) {
  let query = {
    username,
    password: await hashString(password)
  }
  return await getModel('users').findOneAsync(query)
}

function _isInputValid({username, password}) {
  if (!username || username.length < 1) throw new Error('Invalid username.')
  if (!password || password.length < 6) throw new Error('Invalid password.')
  return {username, password}
}
