const Promise           = require('bluebird')
const {hashString}      = require('./lib/crypto')
const {logEventAsync}   = require('./lib/log')
const {getModel}        = require('./lib/db')

module.exports = {auth}

function auth({username, password}) {
  return Promise.resolve({username, password})
    .then(_isInputValid)
    .tap(logEventAsync({event: 'login', username}))
    .then(_loginUser)
    .then(_isResultValid)
}

function _loginUser({username, password}) {
  return Promise.props({username, password: hashString(password)})
    .then(params => getModel('users').findOneAsync(params))
}

function _isInputValid({username, password}) {
  if (!username || username.length < 1) throw new Error('Invalid username.')
  if (!password || password.length < 6) throw new Error('Invalid password.')
  return {username, password}
}

function _isResultValid(user) {
  return user && user._id ? user : Promise.reject(new Error('User Not found!'))
}
