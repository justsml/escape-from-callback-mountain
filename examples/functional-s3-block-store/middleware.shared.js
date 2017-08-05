const errorNotFound = (req, res) => res.status(404)
  .send({error: 'Requested file not found. Check your path.'})
const errorNoArguments = (req, res) => res.status(500)
  .send({error: 'Please specify a bucket/fileId in URI path.'})
const errorUnexpected = (req, res) => res.status(500)
  .send({error: 'Unexpected Error: Check DB connection/configuration.'})
const isLoggedIn = (req, res, next) => req
  .user ? next() : res.status(503).send({error: 'Access denied'})

module.exports = {
  errorNotFound,
  errorNoArguments,
  errorUnexpected,
  isLoggedIn,
}
