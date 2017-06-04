/*****
See Credits & README: https://github.com/justsml/escape-from-callback-mountain
******/
const Promise           = require('bluebird')
const {hashString}      = require('./lib/crypto')
const {logEventAsync}   = require('./lib/log')
const {openAsync}       = require('./lib/db')

const _dbPromise = openAsync() // FYI: Promises include memoization (caching) built into same API

module.exports = {auth}

/* auth is our main function */
function auth({username, password}) {
  return Promise.resolve({username, password})
    .then(isInputValid)
    .tap(() => logEventAsync({event: 'login', username}))
    .then(getModels)
    .then(models => {
      return Promise
        .props({username, password: hashString(password)})
        .then(models.users.findOne)
    })
    .then(isResultValid)
    .catch(errorHandler)
}

function isInputValid({username, password}) {
  if (!username || username.length < 4) { return Promise.reject(new Error('Invalid username. Required, 4 char minimum.')) }
  if (!password || password.length < 4) { return Promise.reject(new Error('Invalid password. Required, 4 char minimum.')) }
  return {username, password}
}

function isResultValid(results) {
  return results ? results.length >= 1 : Promise.reject(new Error('No users matched. Login failed'))
}

function getModels() {
  return _dbPromise.then(db => db && db.models)
}

function errorHandler(err) {
  console.error('Failed auth!', err)
}
