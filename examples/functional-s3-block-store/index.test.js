const BlockStore = require('./')
const test = require('ava')
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const {Types} = mongoose
const {ObjectId} = Types
const tempFileId = (new ObjectId()).toString() + '.png'

test.serial('listBuckets', t => {
  return BlockStore.listBuckets()
    .then(buckets => t.true(buckets.length >= 1))
})

test.serial('createBucket', t => {
  return BlockStore.createBucket('files')
    .then(e => t.truthy(e))
})

test.serial('signedSetUrl', t => {
  return BlockStore.signedSetUrl({id: tempFileId})
    .then(url => {
      t.truthy(url)
    }).catch(err => t.fail(err))
})

test.serial('signedSetUrl', t => {
  return BlockStore.signedSetUrl({id: tempFileId})
    .then(url => {
      t.truthy(url)
    }).catch(err => t.fail(err))
})

test.serial('set', t => {
  const testFile = fs.createReadStream(path.resolve(__dirname, './config.js'))
  const stats    = fs.statSync(path.resolve(__dirname, './config.js'))
  return BlockStore.set({id: tempFileId, stream: testFile, size: 1757, contentType: 'application/javascript'})
    .then(etag => {
      t.truthy(etag)
    }).catch(err => t.fail(err))
})

test.serial('get', t => {
  return BlockStore.get({id: tempFileId})
    .then(file => {
      t.truthy(file)
    }).catch(err => t.fail(err))
})

test.serial('stat', t => {
  return BlockStore.stat({id: tempFileId})
    .then(file => {
      t.truthy(file.size >= 100)
    }).catch(err => t.fail(err))
})

test.serial('remove', t => {
  return BlockStore.remove({id: tempFileId})
    .then(result => {
      // console.log('result', result, typeof result)
      t.truthy(result)
    }).catch(err => t.fail(err))
})

