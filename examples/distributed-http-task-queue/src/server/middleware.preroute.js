const morgan      = require('morgan')
const {initData}  = require('../queue/data-factory')
const DEBUG       = process.env.NODE_ENV === 'development'
const TESTING     = process.env.TEST_ENV && process.env.TEST_ENV.length > 1

const preRoutes   = module.exports = (app) => {
  if (TESTING) initData(10)
  if (TESTING) app.use(morgan('combined'))
  return app
}
