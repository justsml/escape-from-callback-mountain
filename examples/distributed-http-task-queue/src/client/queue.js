const Promise         = require('bluebird')
const superagent      = require('superagent')
const http            = require('../util/http')
const {FatalError}    = require('../util/errors')
const {HttpError}     = require('../util/errors')
const {QueueEmpty}    = require('../util/errors')
const {TimeoutError}  = require('../util/errors')

const serverUrl       = process.env.SERVER_URL || 'http://localhost:9000'

const Queue = module.exports = {
  enqueue: ({url, filters, data}, callback) => http.post(`${serverUrl}/queue`, {url, filters, data})
    .then(data => callback(null, data))
    .catch(callback),
  dequeue: callback => http.get(`${serverUrl}/queue`)
    .then(data => callback(null, data))
    .catch({status: 404}, err => {
      console.error('\n\n#### INTERCEPTING HTTP 404 ERROR ####\n\n\n')
      return Promise.reject(new QueueEmpty('No more work items!', err))
    })
    .catch(callback)
}

Queue.dequeueAsync = Promise.promisify(Queue.dequeue)
Queue.enqueueAsync = Promise.promisify(Queue.enqueue)
