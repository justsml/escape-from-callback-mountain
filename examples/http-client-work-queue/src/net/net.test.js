const test = require('ava')
const clientFactory = require('./client')
const serverFactory = require('./server')

var server = null;

// test.before('start server', t => {
//   serverFactory({})
// })

test.test('server', t => {
  t.plan(2)
  var serverCount = 0;
  var clientCount = 0;
  let router = serverFactory({
    onMessage: (payload, cb) => {
      serverCount ++;
      t.is(typeof payload.message, 'string')
      t.pass()
      router.close()
      return cb(null, {serverCount, payload})
    }
  })
  let {client, send} = clientFactory({
    onMessage: (payload, cb) => {
      clientCount ++;
      return cb(null, {clientCount, payload})
    }
  })
  send({message: 'Starting... Hit me w/ data server!'})
})

test.test('closes', t => {
  t.plan(2)
  var serverCount = 0;
  let router = serverFactory({
    bind: 'tcp://*:9002',
    onMessage: (payload, send) => {
      t.pass()
      serverCount --;
      if (serverCount <= 0) { return send(null, {type: 'close'}) }
      return send(null, {serverCount, payload})
    }
  })
  let {client, send} = clientFactory({
    serverUri: 'tcp://127.0.0.1:9002',
    onClose: payload => {
      t.pass()
    },
    onMessage: (payload, cb) => {
      clientCount ++;
      return cb(null, {clientCount, payload})
    }
  })
  send({type: 'close'})
})
