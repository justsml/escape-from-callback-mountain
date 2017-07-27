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

test('login successful', t => {
  t.plan(2)
  const {auth} = require('./auth.fp')
  return auth({username: 'alice', password: 'superSecret1'})
  .tap(result => {
    t.is(result.username, 'alice')
    t.pass()
  })
})

test('login failed', t => {
  t.plan(1)
  const {auth} = require('./auth.fp')
  return auth({username: 'eve', password: 'fooBar'})
  .then(result => t.fail())
  .catch(err => t.pass())
})
