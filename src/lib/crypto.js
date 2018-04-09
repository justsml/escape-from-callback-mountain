const crypto = require('crypto')

module.exports = {hashString}

function hashString(s, callback) {
  s = crypto.createHash('sha256').update(s).digest('hex')
  if (callback) callback(null, s)
  return s
}
