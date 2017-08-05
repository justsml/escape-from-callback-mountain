const router      = module.exports = require('express').Router()
const BlockStore  = require('./')
const {errorNotFound, errorNoArguments, 
       errorUnexpected, isLoggedIn} = require('./middleware.shared.js')

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

router.route('/:bucket/:id')
  .get(getObject)
  .post(isLoggedIn, setObject)

router.route('/:bucket')
  .get(errorNoArguments)
  .post(isLoggedIn, createBucket)

router.route('/')
  .get(getBucketList)
  .post(errorUnexpected)
  .put(errorUnexpected)
