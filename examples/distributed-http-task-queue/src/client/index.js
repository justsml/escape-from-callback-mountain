const Promise     = require('bluebird')
const fs          = Promise.promisifyAll(require('fs'))
const os          = require('os')
const Queue       = require('./queue')
const Filters     = require('./filters')
const ui          = require('./ui')
const {getUri}    = require('../util/http')
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
  return Queue.dequeueAsync()
  .tap(task => {
    speed.mark()
  })
  .catch(QueueEmpty, err => {
    finished(false)
    // return Promise.reject(new QueueEmpty('Queue Reports Empty State'))
  })
  // temporary timeout
  .catch({status: 503}, err => Promise.resolve(err).delay(200).then(errors.mark.bind(null, 1)).then(loadTask))
  // gateway timeout
  .catch({status: 504}, err => Promise.resolve(err).delay(200).then(errors.mark.bind(null, 10)).then(loadTask))
  // unexpected error
  .catch({status: 500}, err => Promise.resolve(err).delay(300).then(errors.mark.bind(null, 50)).then(loadTask))
  .then(runTask)
  .tap(task => {
    latency.update(Date.now() - start)
  })
  // totally unexpected error
  // .catch(err => {
  //   console.error('UNEXPECTED ERROR!!!!', err, '\nthis', this)
  //   return Promise.resolve(err).delay(2000).then(errors.mark.bind(null, 10)).then(loadTask)
  // })
}

function runTask(task) {
  // track success/errors here
  return getUri(task)
  .catch(err => {
    if (DEBUG) console.error('Http Error:', err)
    errors.mark()
  })
}

function checkErrorLimits() {
  let stats = errors.getCurrentRate();
  if (stats['5MinuteRate'] > ERR_LIMIT) {
    console.error('FATAL ERROR: RATE OF ERRORS EXCEEDED: ', ERR_LIMIT, '/5 minutes', '\nCurrent Error Stats:', stats)
    finished(true)
    // return Promise.reject(new FatalError('Program must exit!!! Reason: error limit exceeded.'))
  }
  return Promise.resolve(stats)
}

// App complete handler - failure defaults to false
function finished(failure = false) {
  console.log('\n\n\n\n#### Completed consuming queue!!!! #### ' + (failure ? '[FAILED]' : '[NORMAL]'))
  console.timeEnd('runtime')
  console.log('\n\n\n Errors:', errors.getJSON())
  done() // cleanup timers ref'ing the console UI
  process.exit(failure ? -999 : 0)
}
