
const zmq     = require('zeromq')

module.exports = function _routerFactory({
  bind = 'tcp://*:9001',
  onMessage = (payload, cb) => cb ? cb(payload) : payload,
}) {
  const router  = zmq.socket('router')

  router.bindSync(bind)

  router.on('message', function _onMsgRouter(id) {
    let data = Array.prototype.slice.call(arguments).slice(1);
    if (data.length === 1 && typeof data === 'string') { data = data[0] }
    if (typeof data === 'string' && /^(\{|\[)/.test(data)) data = JSON.parse(data)

    const send = d => router.send([id, '', JSON.stringify(d)])

    onMessage = Object.is(Function, onMessage) ? onMessage : (d) => console.warn.bind(console, 'no onMessage')

    onMessage(data, (err, results) => {
      if (err) return send({error: err})
      send(results)
    })
  })

  return {router}
}
