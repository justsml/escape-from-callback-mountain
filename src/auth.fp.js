const Promise           = require('bluebird')
const {hashStringAsync} = require('./lib/crypto')
const {logEventAsync}   = require('./lib/log')
const {getModelAsync}   = require('./lib/db')

function auth({username, password}) {
  return Promise.resolve({username, password})
    .then(_checkArgs)
    .tap(logEventAsync({event: 'login', username}))
    .then(_loginUser)
    .then(_checkUser)
}

function _checkArgs({username, password}) {
  if (!username || username.length < 1) throw new Error('Invalid username.')
  if (!password || password.length < 6) throw new Error('Invalid password.')
  return {username, password}
}

function _loginUser({username, password}) {
  return Promise.props({
    UserModel: getModelAsync('users'),
    username,
    password: hashStringAsync(password)})
  .then(({username, password, UserModel}) => UserModel.findOneAsync({username, password}))
}

function _checkUser(user) {
  return user && user._id ? user : Promise.reject(new Error('User Not found!'))
}

module.exports = {auth}
