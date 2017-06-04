const Promise = require('bluebird')
const crypto  = require('crypto')

module.exports = {
  hashString,
  hashStringAsync: Promise.promisify(hashString)
}

function hashString(s, callback = (x, y) => y || x) {
  try {
    return callback(null, crypto.createHash('sha256').update(s).digest('hex'))
  } catch (e) {
    return callback(e)
  }
}
