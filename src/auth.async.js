// 2/4: ASYNC/AWAIT
// Latest fad
const {hashString} = require('./lib/crypto')
const users        = require('./lib/users')

module.exports = {auth}

async function auth(username, password) {
  try {
    if (!username || username.length < 1) throw new Error('Invalid username.')
    if (!password || password.length < 6) throw new Error('Invalid password.')

    let query = {
      username,
      password: hashString(password)
    }
    let user = await users
      .getOne(query)

    if (user && user._id) {
      return user
    } else {
      throw new Error('User Not found!')
    }
  } catch (ex) {
    throw ex
  }
}

