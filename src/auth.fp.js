// FUNCTIONAL PROMISES (aka Functional River)
const Promise           = require('bluebird')
const {hashStringAsync} = require('./lib/crypto')
const {logEventAsync}   = require('./lib/log')
const {getModelAsync}   = require('./lib/db')

module.exports = {auth}

function auth({username = '', password = ''}) {
  return Promise.resolve({username, password})
    .then(_checkArgs)
    .tap(logEventAsync({event: 'login', username}))
    .then(_loginUser)
    .then(_checkUser)
}

function _checkArgs({username = '', password = ''}) {
  if (username.length < 1 || password.length < 6) throw new Error('Check args')
  return {username, password}
}

function _loginUser({username, password}) {
  return Promise.props({
    Users:      getModelAsync('users'),
    hashedPass: hashStringAsync(password)
  })
  .then(({Users, hashedPass}) => Users
    .findOneAsync({username, password: hashedPass}))
}

function _checkUser(user) {
  return user && user._id ? user : Promise.reject(new Error('User Not found!'))
}

module.exports = {auth}
