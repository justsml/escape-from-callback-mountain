const Promise   = require('bluebird')
const Datastore = Promise.promisifyAll(require('nedb'))
const appLog    = new Datastore()

module.exports = {
  logEvent,
  logEventAsync: Promise.promisify(logEvent)
}

function logEvent({event, username, uri, ip}, callback = (x, y) => y || x) {
  appLog.insert({event, username, uri, ip, dateTime: new Date()}, err => callback(err, {success: true}))
}
