const Promise     = require('bluebird')
const superagent  = require('superagent')
const serverUrl   = process.env.SERVER_URL || 'http://localhost:9000'

const Queue = module.exports = {
  enqueue: ({url, filters, data}, callback) => superagent
    .post(`${serverUrl}/queue`)
    .send({url, filters, data})
    .then(res => callback(null, res.body), callback),
  dequeue: callback => superagent
    .get(`${serverUrl}/queue`)
    .then(res => callback(null, res.body), callback)
}

Queue.dequeueAsync = Promise.promisify(Queue.dequeue)
Queue.enqueueAsync = Promise.promisify(Queue.enqueue)