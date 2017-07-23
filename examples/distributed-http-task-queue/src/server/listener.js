const log  = require('debug')('APP:SERVER:LISTENER')
const port = parseInt(process.env.NODE_PORT || process.env.PORT || 8888, null)

const listener = module.exports = (app) => {
  if (port) {
    app.listen(port, function _listen() {
      log('Queue service listening on port %d', port)
    })
  } else {
    console.error('\n\nWarning: No PORT environment variable configured\n')
  }
  return app
}
