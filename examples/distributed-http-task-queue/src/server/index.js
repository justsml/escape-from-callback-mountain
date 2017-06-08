const Promise     = require('bluebird')
const express     = require('express')
const morgan      = require('morgan')
const DEBUG       = process.env.NODE_ENV === 'development'
const {initData}  = require('../queue/data-factory')
const app = module.exports = express()

let {NODE_PORT, PORT} = process.env
let port = NODE_PORT || PORT || 9000

if (DEBUG) {
  initData(3)
  app.use(morgan('combined'))
}

app.use('/queue', require('../queue/middleware'))
app.use('/', (req, res) => res.send('Example project from https://github.com/justsml/escape-from-callback-mountain/ - check your path'))

/// catch 404 and forwarding to error handler
app.use(function _noRouteFallback(req, res, next) {
  res.status(404).send({error: 'Path Not Found: ' + req.url})
})

app.use(function _errorHandler(err, req, res, next) {
  console.error('_errorHandler', err)
  res.status(500).send({
    message:  err.message,
    error:    err,
  })
})

if (port) {
  app.listen(port, function _listen() {
    console.log('Queue service listening on port %d', port)
  })
} else {
  console.error('Warning: No PORT environment variable configured')
}

module.exports = app;
