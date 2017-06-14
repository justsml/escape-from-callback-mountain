const bodyParser  = require('body-parser');
const {enqueueAsync, dequeueAsync} = require('../queue')
const {TimeoutError, QueueEmpty, NotFound} = require('../util/errors')
const router      = module.exports = require('express').Router()
const DEBUG       = process.env.NODE_ENV === 'development'
const TESTING     = process.env.TEST_ENV && process.env.TEST_ENV.length > 1

const autoCloseForTests = () => {
  if (TESTING) {
    // Auto close if we're in development mode
    console.log('Test Complete: Closing App SERVER in 5 sec...')
    setTimeout(() => console.log('Test Complete: Closing App SERVER NOW') && process.exit(0), 5000)
  }
}

const enqueueHandler = (req, res, next) => {
  enqueueAsync(req.body)
    .then(result => res.send({result}))
    .catch(next)
}

const dequeueHandler = (req, res, next) => {
  dequeueAsync()
    .then(task => !task ? Promise.reject(new QueueEmpty('Not found', task)) : task)
    .then(task => res.send([task]))
    .tap(task => log('Task dequeued: ', tast))
    .catch(QueueEmpty, () => {
      autoCloseForTests()
      res.status(404).send({message: `queue at "${req.url}" contains zero items`})
    })
    .catch(next)
}

router
  .use(bodyParser.json())
  .route('/')
  .get(dequeueHandler)
  .put(enqueueHandler)
  .post(enqueueHandler)
