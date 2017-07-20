var minioClient
const Promise         = require('bluebird')
const Minio           = require('minio')
const blockStorage    = require('./config')

module.exports = {set, get, remove, stat,
  listBuckets, createBucket,
  signedGetUrl, signedSetUrl}

function set({id, stream, size = 0, contentType = 'application/octet-stream', bucket = 'files'}) {
  return minioClient.putObjectAsync(bucket, id, stream, size, contentType)
}

function get({id, bucket = 'files'}) {
  return minioClient.getObjectAsync(bucket, id)
}

function remove({id, bucket = 'files'}) {
  return minioClient.removeObjectAsync(bucket, id)
}

function stat({id, bucket = 'files'}) {
  return minioClient.statObjectAsync(bucket, id)
}

function signedGetUrl({id, expires = 60*60*24, bucket = 'files'}) {
  return minioClient.presignedGetObjectAsync(bucket, id, expires)
}

function signedSetUrl({id, expires = 60*60*24, bucket = 'files'}) {
  return minioClient.presignedPutObjectAsync(bucket, id, expires)
}

function listBuckets() {
  return minioClient.listBucketsAsync()
}

function createBucket(bucket) {
  return listBuckets()
    // .tap(console.log.bind(console, 'bucketList'))
    .then(buckets => buckets.find(({name}) => bucket === name))
    .then(exists => exists ? true : minioClient.makeBucketAsync(bucket, 'us-east-1'))
}

if (blockStorage && blockStorage.port) {
  blockStorage.port = parseInt(blockStorage.port, null)
  minioClient = new Minio.Client(blockStorage)
  Promise.promisifyAll(minioClient)
}
