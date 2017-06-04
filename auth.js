/*****
See Credits & README: https://github.com/justsml/escape-from-callback-mountain
******/
const Promise           = require('bluebird')
const {hashStringAsync} = Promise.promisifyAll(require('./lib/crypto'))
const {logEventAsync}   = Promise.promisifyAll(require('./lib/log'))
const {openAsync}       = Promise.promisifyAll(require('./lib/db'))

var _dbPromise = openAsync() // FYI: Promises include memoization (caching) built into same API

module.exports = {auth}

/* auth is our main function */
function auth({username, password}) {
  return Promise.resolve({username, password})
    .then(authValidated)
    .tap(logEventAsync({event: 'login', username}))
    .then(usersModel)
    .then(users => {
      return hashedPasswordUserQuery({username, password})
        .then(users.findOneAsync)
        .then(userFound)
    })
    .catch(errorHandler)
}

function authValidated({username, password}) {
  if (!username || username.length < 4) { return Promise.reject(new Error('Invalid username. Required, 4 char minimum.')) }
  if (!password || password.length < 4) { return Promise.reject(new Error('Invalid password. Required, 4 char minimum.')) }
  return {username, password}
}

function userFound(results) {
  return results ? results : Promise.reject(new Error('No users matched. Login failed'))
}

function hashedPasswordUserQuery({username, password}) {
  return hashStringAsync(password)
    .then(hashPass => {
      return {username, hashPass}
    })
}

function usersModel() {
  return _dbPromise
    .then(({models}) => models.users)
}

function errorHandler(err) {
  console.error('Failed auth!', err)
}
