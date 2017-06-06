const express     = require('express')
const app = module.exports = express()

app.use('/queue', require('../queue/middleware'))
app.use('/', (req, res) => res.send('make a valid queue request'))

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

let {NODE_PORT, PORT} = process.env
let port = NODE_PORT || PORT// || 9900

if (port) {
  app.listen(port, function _listen() {
    console.log('Queue service listening on port', port)
  })
}

module.exports = app;
