const Promise   = require('bluebird')
const Datastore = require('nedb')

const test = new Datastore()
const Cursor = test.find().constructor;
Promise.promisifyAll(Datastore.prototype)
Promise.promisifyAll(Cursor.prototype)

// const Queue = new Datastore({ filename: '.queue.db', autoload: true })
const Queue = new Datastore()

const methods = {
  enqueue({url, filters, data = ''}, callback = (x, y) => y || x) {
    return Queue.insert({url, filters, data, created: new Date()}, (err, data) => {
      // console.log('results', err, data)
      // console.warn('callback', callback)
      callback(err, data)
    })
  },

  dequeue(callback = (x, y) => y || x) {
    let limit = 1
    return methods._getLatestAsync()
      .then(payload => {
        if (!payload) { return Promise.reject(new Error('Empty Queue'))}
        let {_id} = payload
        return Queue.removeAsync({_id})
        .then(num => {
          if (num !== limit) {
            return Promise.reject(new Error('Race condition #fail! Try dequeue again. NOTE: Not production ready.'))
          }
          return callback(null, payload)
        })
      })
      .catch(err => {
        if (/Race/.test(err.message)) {
          return this.dequeue()
        }
        callback(err)
        return Promise.reject(err)
      })
  },

  _getLatest(callback = (x, y) => y || x) {
    return Queue.findOne({})
      .sort({created: -1})
      .limit(1).exec(callback)
  }

}


methods._getLatestAsync = Promise.promisify(methods._getLatest)
methods.dequeueAsync    = Promise.promisify(methods.dequeue)
methods.enqueueAsync    = Promise.promisify(methods.enqueue)

module.exports = methods

