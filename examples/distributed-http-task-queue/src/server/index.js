const Promise     = require('bluebird')
const express     = require('express')
const log         = require('debug')('APP:SERVER')
const preRoute    = require('./middleware.preroute')
const postRoute   = require('./middleware.postroute')
const listener    = require('./listener')

const app = module.exports = express()

preRoute(app)

app.use('/queue', require('../queue/middleware'))
app.use('/', (req, res) => res.send('Example project from https://github.com/justsml/escape-from-callback-mountain/ - check your path'))

postRoute(app)
listener(app)
// catch no matching routes with a 404 handle


module.exports = app;
