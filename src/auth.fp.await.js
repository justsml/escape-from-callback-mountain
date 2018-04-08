// 3/4: VERSION USING ASYNC/AWAIT
// A little more modular fad
const {hashString} = require('./lib/crypto')
const users        = require('./lib/users')

module.exports = {auth}

async function auth({username, password}) {
  if (_isInputValid({username, password})) {
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
    password: hashString(password)
  }
  return await users.getOne(query)
}

function _isInputValid({username, password}) {
  if (!username || username.length < 1) throw new Error('Invalid username.')
  if (!password || password.length < 6) throw new Error('Invalid password.')
  return {username, password}
}
