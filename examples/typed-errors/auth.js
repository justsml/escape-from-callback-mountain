/*****
See Credits & README: https://github.com/justsml/escape-from-callback-mountain
******/
const Promise           = require('bluebird')
const {hashStringAsync} = Promise.promisifyAll(require('./lib/crypto'))
const {logEventAsync}   = Promise.promisifyAll(require('./lib/log'))
const {openAsync}       = Promise.promisifyAll(require('./lib/db'))
const {TimeoutError,
  ValidationError,
  NotFoundError}        = require('./errors')

const _openHandle = openAsync() // FYI: Promises include memoization (caching) built into same API

module.exports = {auth}

/* auth is our main function */
function auth({username, password,
    _onTimeoutError = errorHandler,
    _onNotFoundError = errorHandler,
    _onValidationError = errorHandler}) {
  return Promise.resolve({username, password})
    .then(authValidated)
    .then(usersModel)
    .then(users => {
      return hashedPasswordUserQuery({username, password})
        .then(users.findOneAsync)
        .then(userFound)
    })
    .catch(TimeoutError,    _onTimeoutError)
    .catch(NotFoundError,   _onNotFoundError)
    .catch(ValidationError, _onValidationError)
    .catch(errorHandler)
}

function authValidated({username, password}) {
  if (!username || username.length < 4) { return Promise.reject(new ValidationError('Invalid username. Required, 4 char minimum.')) }
  if (!password || password.length < 4) { return Promise.reject(new ValidationError('Invalid password. Required, 4 char minimum.')) }
  return {username, password}
}

function userFound(results) {
  return results ? results : Promise.reject(new NotFoundError('No users matched. Login failed'))
}

function hashedPasswordUserQuery({username, password}) {
  return hashStringAsync(password)
    .then(hashPass => {
      return {username, hashPass}
    })
}

function usersModel() {
  return _openHandle
    .then(({models}) => models.users)
}

function errorHandler(err) {
  console.error('Failed auth!', err)
}
