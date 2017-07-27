const Promise     = require('bluebird')
const express     = require('express')
const log         = require('debug')('APP:SERVER')
const preRoute    = require('./middleware.preroute')
const postRoute   = require('./middleware.postroute')
const listener    = require('./listener')

const app = module.exports = express()

preRoute(app)

app.use('/queue', require('../queue/middleware'))
app.use('/', (req, res) => res.send(`
  Welcome to an Example from the guide project:
  https://github.com/justsml/escape-from-callback-mountain/
  Thx for the stars!`))

postRoute(app)
listener(app)

module.exports = app
