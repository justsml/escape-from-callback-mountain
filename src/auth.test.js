const test = require('ava')

test.before('create user records', t => {
  const users = require('./lib/users')
  const {hashString} = require('./lib/crypto')
  const password = hashString('superSecret1')
  return users.create({username: 'alice', email: 'alice@nsa.gov', password})
    .then(result => {
      t.is(typeof result, 'object')
      t.pass()
    })
})

// test.cb('callback: login successful', t => {
//   t.plan(2)
//   const {auth} = require('./auth.callbacks')
//   return auth('alice', 'superSecret1', (err, result) => {
//     console.log('err:', err, '\nresult:', result, '\n')
//     t.is(result.username, 'alice')
//     t.falsy(err)
//     t.end()
//   })
// })

// test.cb('callback: login failed', t => {
//   t.plan(1)
//   const {auth} = require('./auth.callbacks')
//   auth('eve', 'fooBar', (err, result) => t.truthy(err) || t.end())
// })

test('fp/river: login successful', t => {
  t.plan(2)
  const {auth} = require('./auth.fp')
  return auth({username: 'alice', password: 'superSecret1'})
  .then(result => {
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

