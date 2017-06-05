const zmq  = require('zeromq')
const sock = zmq.socket('pub')

sock.bindSync('tcp://*:3333');
console.log('Publisher bound to port 3000');

setInterval(function(){
  console.log('sending a multipart message envelope');
  sock.send(['kitty cats', 'meow!']);
}, 500);
