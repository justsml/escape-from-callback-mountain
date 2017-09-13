const test = require('ava')

test.before('create user records', t => {
  const {addUserAsync} = require('./lib/db')
  return addUserAsync({id: 1, username: 'alice', email: 'alice@nsa.gov', password: 'superSecret1'})
    .tap(result => {
      // console.log('\ntest user:', result, '\n')
      t.is(typeof result, 'object')
      t.pass()
    })
})

test.cb('callback: login successful', t => {
  t.plan(2)
  const {auth} = require('./auth.callbacks')
  return auth('alice', 'superSecret1', (err, result) => {
    t.is(result.username, 'alice')
    t.falsy(err)
    t.end()
  })
})

test.cb('callback: login failed', t => {
  t.plan(1)
  const {auth} = require('./auth.callbacks')
  auth('eve', 'fooBar', (err, result) => t.truthy(err) || t.end())
})

test('fp/river: login successful', t => {
  t.plan(2)
  const {auth} = require('./auth.fp')
  return auth({username: 'alice', password: 'superSecret1'})
  .tap(result => {
    t.is(result.username, 'alice')
    t.pass()
  })
})

test('fp/river: login failed', t => {
  t.plan(1)
  const {auth} = require('./auth.fp')
  return auth({username: 'eve', password: 'fooBar'})
  .then(result => t.fail())
  .catch(err => t.pass())
})

