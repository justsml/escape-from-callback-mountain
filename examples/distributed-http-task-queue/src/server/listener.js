const log  = require('debug')('APP:SERVER:LISTENER')
const port = NODE_PORT || PORT || 9000

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
