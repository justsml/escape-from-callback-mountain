const Promise           = require('bluebird')
const {hashString}      = require('./lib/crypto')
const {logEventAsync}   = require('./lib/log')
const {getModel}        = require('./lib/db')

const Users    = getModel('users')

module.exports = {auth}

async function auth(username, password) {
  try {
    if (!username || username.length < 1) throw new Error('Invalid username.')
    if (!password || password.length < 6) throw new Error('Invalid password.')

    logEventAsync({event: 'login', username})

    let hashedQuery = {
      username,
      password: await hashString(password)
    }
    let user = await Users
      .findOneAsync(hashedQuery)

    if (user && user._id) {
      return user
    } else {
      throw new Error('User Not found!')
    }
  } catch(ex) {
    throw ex
  }
}
