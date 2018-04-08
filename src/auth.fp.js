// FUNCTIONAL PROMISES (aka Functional River)
const {hashString} = require('./lib/crypto')
const users        = require('./lib/users')

function auth({username = '', password = ''}) {
  return Promise.resolve({username, password})
    .then(_checkArgs)
    .then(_loginUser)
    .then(_checkUser)
}

function _checkArgs({username = '', password = ''}) {
  if (username.length < 1) throw new Error('Enter a valid username')
  if (password.length < 6) throw new Error('Enter a valid Password')
  return {username, password}
}

function _loginUser({username, password}) {
  return Promise.resolve(hashString(password))
    .then(password => users.getOne({username, password}))
}

function _checkUser(user) {
  if (user && user._id) return user
  throw new Error('No User found. Check credentials and try again.')
}

module.exports = {auth, _checkArgs, _loginUser, _checkUser}
