const Promise           = require('bluebird')
const {hashStringAsync} = Promise.promisifyAll(require('../../src/lib/crypto'))
const {logEventAsync}   = Promise.promisifyAll(require('../../src/lib/log'))
const {openAsync}       = Promise.promisifyAll(require('../../src/lib/db'))

const _dbHandle = openAsync()

