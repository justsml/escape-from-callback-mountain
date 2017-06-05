// producer.js

// producer.js
const zmq = require('zeromq')

function serverFactory({
  bind = 'tcp://*:9001',
  // onMessage = (payload, cb) => cb ? cb(payload) : payload,
}) {
  const sock = zmq.socket('push')

  sock.bindSync(bind);
  console.warn('Producer bound to port ', bind, '\ncall sock.send(...) to begin');

  // setInterval(function(){
  //   console.warn('sending work');
  //   sock.send('some work');
  // }, 500);

  return {server: sock}
}

function clientFactory({
  serverUri = 'tcp://127.0.0.1:9001',
  onMessage = (payload, cb) => cb ? cb(payload) : payload,
}) {
  const sock = zmq.socket('pull')

  sock.connect(serverUri)
  console.warn('Worker connected to ', serverUri)

  sock.on('message', function(msg) {
    console.warn('Work: %s', msg.toString());
    onMessage(JSON.parse(msg), err => {
      console.warn('onMessage.callback', err, msg)
    })
  })
  return {client: sock};
}
