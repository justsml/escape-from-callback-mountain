const test = require('ava')
const users = require('./users')

test('has needed methods', t => {
  t.truthy(typeof users.getOne === 'function')
  t.truthy(typeof users.create === 'function')
})
