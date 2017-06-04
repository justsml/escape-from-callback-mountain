const test = require('ava');

test.before('create user records', t => {
  const {addUserAsync} = require('../lib/db')
  return addUserAsync({id: 1, username: 'jane', email: 'jane@nsa.gov', password: 'superSecret1'})
    .tap(result => {
      console.log('result:', result)
      t.is(typeof result, 'object')
      t.pass()
    })
})

test.test('lib/crypto', t => {
  const {hashStringAsync, hashString} = require('../lib/crypto')
  let hashed = hashString('hello world')
  t.is(hashed, 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9')
  t.pass()
})

test.test('lib/db: openAsync', t => {
  t.plan(2);
  const {open, openAsync} = require('../lib/db')
  return Promise.resolve(open())
  .then(db => {
    t.is(typeof db.models, 'undefined')
    t.pass()
    return db.models
  })
})

test.test('lib/log', t => {
  t.plan(2);
  const {logEvent, logEventAsync} = require('../lib/log')
  return logEventAsync({event: 'login', username: 'eve'})
  .tap(result => {
    t.truthy(result.success)
    t.pass()
  })
})

test.test('auth', t => {
  t.plan(2);
  const {auth} = require('../auth')
  return auth({username: 'jane', password: 'superSecret1'})
  .tap(result => {
    console.log('\nuser.result', result)
    t.is(result.username, 'jane')
    t.pass()
  })
})