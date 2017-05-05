/*****
This was originally inspired by examples I found googling for (roughly) "NodeJS code user password hash"

Initial Ver:        https://github.com/justsml/escape-from-callback-mountain/commit/f828e863ee04df5b3f7f4f4307681bb3fde5285a?diff=unified
All commits:        https://github.com/justsml/escape-from-callback-mountain/commits/master
PRs Show Refactor:  https://github.com/justsml/escape-from-callback-mountain/pulls?utf8=%E2%9C%93&q=is%3Apr

******/

const Promise           = require('bluebird')
const {hashStringAsync} = Promise.promisifyAll(require('./lib/crypto'))
const {auditLogAsync}   = Promise.promisifyAll(require('./lib/log'))
const {openAsync}       = Promise.promisifyAll(require('./lib/db'))

var _openHandle = openAsync(); // FYI: Promises include memoization (caching) built into same API

function authValidated({username, password}) {
  if (!username || username.length < 4) { return Promise.reject(new Error('Invalid username. Required, 4 char minimum.')) }
  if (!password || password.length < 4) { return Promise.reject(new Error('Invalid password. Required, 4 char minimum.')) }
  return {username, password}
}

function userFound(results) {
  return results ? results : Promise.reject(new Error('No users matched. Login failed'))
}

function usersModel() {
  return _openHandle
    .then(({models}) => models.users)
}

function errorHandler(err) {
  console.error('Failed auth!', err)
} 

function auth({username, password}) {
  const userQuery = hashStringAsync(password)
    .then(hashPass => ({username, hashPass}))
  const loginEvent = () => auditLogAsync({event: 'login', username})
  
  return Promise
    .resolve({username, password})
    .catch(errorHandler)
    .then(authValidate)
    .tap(loginEvent)
    .then(usersModel)
    .then(users => {
      return userQuery
        .then(users.findOneAsync)
        .then(userFound)
    })
  
}
