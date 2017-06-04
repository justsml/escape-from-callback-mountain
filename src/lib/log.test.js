const test = require('ava')
const {logEvent, logEventAsync} = require('./log')

test('logEventAsync', t => {
  t.plan(2)
  return logEventAsync({event: 'login', username: 'eve'})
  .tap(result => {
    t.truthy(result.success)
    t.pass()
  })
})

test('logEvent', t => {
  t.plan(3)
  return logEvent({event: 'login', username: 'eve'}, (err, result) => {
    t.ifError(err)
    t.truthy(result.success)
    t.pass()
  })
})
