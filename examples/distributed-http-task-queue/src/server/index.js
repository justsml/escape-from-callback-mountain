const Promise     = require('bluebird')
const express     = require('express')
const log         = require('debug')('APP:SERVER')
const postRoute   = require('./middleware.postroute')
const listener    = require('./listener')
const {initData}  = require('../queue/data-factory')
const TESTING     = process.env.TEST_ENV && process.env.TEST_ENV.length > 1
const app = module.exports = express()
if (TESTING) initData(10)

preRoute(app)

app.use('/queue', require('../queue/middleware'))
app.use('/', (req, res) => res.send('Example project from https://github.com/justsml/escape-from-callback-mountain/ - check your path'))

postRoute(app)
listener(app)
// catch no matching routes with a 404 handle


module.exports = app;
