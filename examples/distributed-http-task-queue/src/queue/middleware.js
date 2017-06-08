const bodyParser  = require('body-parser');
const {enqueueAsync, dequeueAsync} = require('../queue')
const {TimeoutError, QueueEmpty, NotFound} = require('../util/errors')
const router = module.exports = require('express').Router()
const DEBUG       = process.env.NODE_ENV === 'development'

const enqueueHandler = (req, res, next) => {
  enqueueAsync(req.body)
    .then(result => res.send({result}))
    .catch(next)
}

const dequeueHandler = (req, res, next) => {
  dequeueAsync()
    .then(task => !task ? Promise.reject(new QueueEmpty('Not found', task)) : task)
    .then(task => res.send([task]))
    .catch(QueueEmpty, err => {
      if (DEBUG) {
        // Auto close if we're in development mode
        setTimeout(() => {
          console.log('Closing')
          process.exit(0)
        }, 1)
      }
      res.status(404).send({message: `queue at "${req.url}" contains zero items`})
    })
    .catch(next)
}


router
  .use(bodyParser.json())
  .route('/')
  .get( dequeueHandler)
  .put( enqueueHandler)
  .post(enqueueHandler)
