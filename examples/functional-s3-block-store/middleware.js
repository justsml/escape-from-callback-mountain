const router      = module.exports = require('express').Router()
const BlockStore  = require('./')

// Define thin wrappers for express implementing our BlockStore methods
const getObject = (req, res) => {
  return BlockStore.get(req.params)
    .then(data => data.pipe(res))
    .catch(() => errorNotFound(req, res))
}
const getBucketList = (req, res) => { // ;)
  return BlockStore.listBuckets()
    .then(data => res.send(data))
    .catch(() => errorUnexpected(req, res))
}
const createBucket = (req, res) => {
  return BlockStore.createBucket(req.params.bucket)
    .then(data => res.send(data))
    .catch(() => errorUnexpected(req, res))
}

// Error/misc handlers, TODO: move these to another file
const errorNotFound = (req, res) => res.status(404)
  .send({error: 'Requested file not found. Check your path.'})
const errorNoArguments = (req, res) => res.status(500)
  .send({error: 'Please specify a bucket/fileId in URI path.'})
const errorUnexpected = (req, res) => res.status(500)
  .send({error: 'Unexpected Error: Check DB connection/configuration.'})
const isLoggedIn = (req, res, next) => req
  .user ? next() : res.status(503).send({error: 'Access denied'})

router.route('/:bucket/:id')
  .get(getObject)
  .post(isLoggedIn, setObject)
router.route('/:bucket')
  .get(noArguments)
  .post(isLoggedIn, createBucket)
router.route('/')
  .get(getBucketList)
