const test = require('ava')
const {logEvent, logEventAsync} = require('./log')

test('log.logEventAsync', t => {
  t.plan(2)
  return logEventAsync({event: 'login', username: 'eve'})
  .tap(result => {
    t.truthy(result.success)
    t.pass()
  })
})
