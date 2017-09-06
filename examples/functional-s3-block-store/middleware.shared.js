module.exports = {
  errorNotFound: (req, res) => res.status(404)
    .send({error: 'Requested file not found. Check your path.'}),
  errorNoArguments: (req, res) => res.status(500)
    .send({error: 'Please specify a bucket/fileId in URI path.'}),
  errorUnexpected: (req, res) => res.status(500)
    .send({error: 'Unexpected Error: Check DB connection/configuration.'}),

  isLoggedIn: (req, res, next) => req
    .user ? next() : res.status(503).send({error: 'Access denied'}),
}
