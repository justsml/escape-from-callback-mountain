const Promise           = require('bluebird')
const {hashStringAsync} = Promise.promisifyAll(require('./lib/crypto'))
const {logEventAsync}   = Promise.promisifyAll(require('./lib/log'))
const {openAsync}       = Promise.promisifyAll(require('./lib/db'))

const _dbHandle = openAsync()

