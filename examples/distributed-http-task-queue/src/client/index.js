Error.stackTraceLimit = 40
const Promise     = require('bluebird')
Promise.longStackTraces()

const fs          = Promise.promisifyAll(require('fs'))
const os          = require('os')
const Queue       = require('./queue')
const Filters     = require('./filters')
const ui          = require('./ui')
const http        = require('../util/http')
const SERVER_URL  = process.env.SERVER_URL || process.env.SERVER_URI || 'http://localhost:9000'
const DEBUG       = process.env.NODE_ENV === 'development'
const ERR_LIMIT   = parseInt(process.env.ERR_LIMIT || 3, 10)

const {FatalError}    = require('../util/errors')
const {QueueEmpty}    = require('../util/errors')
const {TimeoutError}  = require('../util/errors')
const {HttpError}     = require('../util/errors')

const {done, latency, speed, errors} = ui()

main()

function main() {
  console.log(`Starting client on host '${os.hostname()}' w/ target server ${SERVER_URL} ...\n\n`)
  console.time('runtime')
  if (/:\/\//.test(SERVER_URL)) {
    loadTask()
  } else {
    throw new FatalError('Invalid SERVER_URL environment variable!')
  }

}

function loadTask() {
  let start = Date.now()
  return _checkErrorLimits()
  .then(() => Queue.dequeueAsync())
  .tap(task => {
    speed.mark()
  })
  .map(runTask)
  .catch(QueueEmpty, err => {
    _finished(false)
    return {complete: true}
    // return Promise.reject(new QueueEmpty('Queue Reports Empty State'))
  })
  // temporary timeout
  .catch({status: 503}, err => Promise.resolve(err).delay(200).then(errors.mark.bind(null, 1)).then(loadTask))
  // gateway timeout
  .catch({status: 504}, err => Promise.resolve(err).delay(200).then(errors.mark.bind(null, 10)).then(loadTask))
  // unexpected error
  .catch({status: 500}, err => Promise.resolve(err).delay(300).then(errors.mark.bind(null, 50)).then(loadTask))
  // .all()
  // .tap(result => console.warn('    ALL RESULT:', result))
  .then(r => Array.isArray(r) && r.length === 1 ? r[0] : r)
  // .filter(inspection => inspection.isFulfilled())
  // .mapSeries(inspection => inspection.value())
  .tap(result => {
    console.warn('TASK RESULTS: #', result && JSON.stringify(result).length, 'in', ((Date.now() - start) / 1000.0).toFixed(2), 'sec.')
    latency.update(Date.now() - start)
  })
  // .tap(result => console.warn('### RESULT:', result))
  .then(r => Array.isArray(r) && r.length === 1 ? r[0] : r)
  .then(result => {
    let {_task}         = result
    let {url, filters}  = _task
    // apply filters
    return Promise.resolve(filters || [])
    .reduce((result, name) => {
      if (Filters[name]) {
        return Filters[name](result)
      } else {
        return Promise.reject(new Error('Invalid Filter Configured: ' + name + ' for url: ' + url))
      }
    }, result)
  })
  .then(loadTask)

  // totally unexpected error
  // .catch(err => {
  //   console.error('UNEXPECTED ERROR!!!!', err, '\nthis', this)
  //   return Promise.resolve(err).delay(2000).then(errors.mark.bind(null, 10)).then(loadTask)
  // })
}

function runTask(task) {
  // track success/errors here
  console.log(`Running task:`, task)
  return http.get(task.url)
  .catch(err => {
    if (DEBUG) console.error('Http Error:', err)
    errors.mark()
  })
  .then(value => ({
    _task: task,
    key: task.url,
    value,
  }))
}

function _checkErrorLimits() {
  let stats = errors.getCurrentRate();
  if (stats['5MinuteRate'] > ERR_LIMIT) {
    console.error('FATAL ERROR: RATE OF ERRORS EXCEEDED: ', ERR_LIMIT, '/5 minutes', '\nCurrent Error Stats:', stats)
    _finished(true)
    return Promise.reject(new FatalError('Program must exit!!! Reason: error limit exceeded.'))
  }
  return Promise.resolve(stats)
}

// App complete handler - failure defaults to false
function _finished(failure = false) {
  console.log('\n\n\n\n#### Completed consuming queue!!!! #### ' + (failure ? '[FAILED]' : '[NORMAL]'))
  console.timeEnd('runtime')
  // console.log('\n\n\n Latency:', latency)
  // console.log('\n\n\n Speed:', speed)
  console.log('\n\n\n Errors:', errors.getCurrentRate())
  done() // cleanup timers ref'ing the console UI
  process.exit(failure ? -999 : 0)
}

process.on('unhandledRejection', (err, promise) => {
  console.error('FATAL ERROR/UNHANDLED:', err, promise)
  console.log('#### STACK:', err.stack)
})
