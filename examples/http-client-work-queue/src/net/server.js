
const zmq     = require('zeromq')
const router  = module.exports = zmq.socket('router');
let WORKERS_NUM = 10;


router.bindSync('tcp://*:9000');

router.on('message', function _onMsgRouter(id) {
  router.send([id, '', Array.prototype.slice.call(arguments, 1)])
});

