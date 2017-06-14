module.exports = (app) => {
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
  return app
}
