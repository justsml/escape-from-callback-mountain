var minioClient
const Promise         = require('bluebird')
const {Client}        = require('minio')
const blockStorage    = require('./config')

module.exports = {set, get,
  find, remove, stat,
  listBuckets, createBucket,
  signedGetUrl, signedSetUrl}

function _validate({id, bucket}) {
  if (!id || id.length < 1) return Promise.reject(new Error('Invalid parameter: id: ' + id))
  return Promise.resolve(arguments[0])
}

function set({id, bucket = 'files', stream, size = 0, contentType = 'application/octet-stream'}) {
  return _validate(arguments[0])
    .then(() => minioClient.putObjectAsync(bucket, id, stream, size, contentType))
}

function get({id, bucket = 'files'}) {
  return _validate(arguments[0])
    .then(() => minioClient.getObjectAsync(bucket, id))
}

function find({bucket = 'files', prefix, recursive = false}) {
  if (typeof prefix !== 'string') return Promise.reject(new Error('Invalid prefix.'))
  let resolve, reject, p = new Promise((ok, no) => { resolve = ok; reject = no })
  let files = []
  minioClient.listObjectsV2(bucket, prefix, recursive)
    .on('error', reject)
    .on('data', file => files.push(file))
    .on('end', () => resolve(files))
  return p
}

function remove({id, bucket = 'files'}) {
  return _validate(arguments[0])
    .then(() => minioClient.removeObjectAsync(bucket, id))
}

function stat({id, bucket = 'files'}) {
  return _validate(arguments[0])
    .then(() => minioClient.statObjectAsync(bucket, id))
}

function signedGetUrl({id, bucket = 'files', expires = 60*60*24}) {
  return _validate(arguments[0])
    .then(() => minioClient.presignedGetObjectAsync(bucket, id, expires))
}

function signedSetUrl({id, bucket = 'files', expires = 60*60*24}) {
  return _validate(arguments[0])
    .then(() => minioClient.presignedPutObjectAsync(bucket, id, expires))
}

function listBuckets() {
  return minioClient.listBucketsAsync()
}

function createBucket(bucket, region = 'us-east-1') {
  if (!bucket || bucket.length <= 1) return Promise.reject(new Error('Invalid bucket argument.'))
  return listBuckets()
    .then(buckets => buckets.find(({name}) => bucket === name))
    .then(exists => exists ? {exists: true, name: bucket} : minioClient.makeBucketAsync(bucket, region))
}

if (blockStorage && blockStorage.port) {
  blockStorage.port = parseInt(blockStorage.port, null)
  minioClient = new Client(blockStorage)
  Promise.promisifyAll(minioClient)
}
