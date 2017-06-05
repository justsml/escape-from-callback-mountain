const zmq   = require('zeromq')
const log   = require('debug')('')
module.exports = _clientFactory

// const config = {
//   serverUri: process.env.SERVER_URI || 'tcp://127.0.0.1:9001',
// }

function _clientFactory({
  serverUri = 'tcp://127.0.0.1:9001',
  onMessage = (payload, cb) => cb ? cb(payload) : payload,
  onClose = () => null,
}) {
  const client  = zmq.socket('req')
  const send    = data => client.send(JSON.stringify(data))

  client.connect(serverUri)

  client.on('message', function handler(json) {
    var payload = JSON.parse(json.toString())
    if (payload.type === 'close') {
      console.log('Close command. Client done.', payload)
      onClose(payload)
      return client.close()
    }
    if (Object.is(Function, onMessage)) {
      onMessage(payload, (err, results) => {
        if (err) return send({error: err})
        send(results)
      })
    }
  })

  // Register to monitoring events
  socket.on('connect', function(fd, ep) {log('connect, endpoint:', ep) })
  socket.on('connect_delay', function(fd, ep) {log('connect_delay, endpoint:', ep) })
  socket.on('connect_retry', function(fd, ep) {log('connect_retry, endpoint:', ep) })
  socket.on('listen', function(fd, ep) {log('listen, endpoint:', ep) })
  socket.on('bind_error', function(fd, ep) {log('bind_error, endpoint:', ep) })
  socket.on('accept', function(fd, ep) {log('accept, endpoint:', ep) })
  socket.on('accept_error', function(fd, ep) {log('accept_error, endpoint:', ep) })
  socket.on('close', function(fd, ep) {log('close, endpoint:', ep) })
  socket.on('close_error', function(fd, ep) {log('close_error, endpoint:', ep) })
  socket.on('disconnect', function(fd, ep) {log('disconnect, endpoint:', ep) })

  // Handle monitor error
  socket.on('monitor_error', function(err) {
    console.log('Error in monitoring: %s, will restart monitoring in 5 seconds', err);
    setTimeout(function() { socket.monitor(500, 0); }, 5000);
  });

  // Call monitor, check for events every 500ms and get all available events.
  console.log('Start monitoring...');
  socket.monitor(500, 0);
  socket.connect('tcp://127.0.0.1:1234');

  return {send, client}
  // client.send('Hi boss!');
}
