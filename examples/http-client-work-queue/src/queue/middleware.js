const bodyParser  = require('body-parser');
const {enqueueAsync, dequeueAsync} = require('../queue')
const {TimeoutError, QueueEmpty, NotFound} = require('../util/errors')

const enqueueHandler = (req, res, next) => {
  enqueueAsync(req.body)
    .then(result => res.send(result))
    .catch(next)
}

const dequeueHandler = (req, res, next) => {
  dequeueAsync()
    .then(task => !task ? Promise.reject(new QueueEmpty('Not found')) : task)
    .then(task => res.send([task]))
    .catch(QueueEmpty, err => res.status(404).send({message: `queue at "${req.url}" contains zero items`}))
    .catch(next)
}

const router = module.exports = require('express').Router()
router
  .get('/',  bodyParser.json(), dequeueHandler)
  .put('/',  bodyParser.json(), enqueueHandler)
  .post('/', bodyParser.json(), enqueueHandler)
