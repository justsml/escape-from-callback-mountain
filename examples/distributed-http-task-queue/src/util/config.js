const DEBUG       = process.env.NODE_ENV === 'development'
const TESTING     = process.env.TEST_ENV && process.env.TEST_ENV.length > 1
const SERVER_URL  = process.env.SERVER_URL || process.env.SERVER_URI || 'http://localhost:8888'
const ERR_LIMIT   = parseInt(process.env.ERR_LIMIT || 5, null)

module.exports    = {SERVER_URL, ERR_LIMIT, DEBUG, TESTING}
