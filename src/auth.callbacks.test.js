const test = require('ava')
const {auth, _checkArgs, _loginUser, _checkUser} = require('./auth.callbacks')

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

test.cb('auth(): login successful', t => {
  t.plan(1)
  return auth({username: 'alice', password: 'superSecret1'}, (err, result) => {
    t.is(result.username, 'alice')
    t.end()
  })
})

test.cb('auth(): login failed', t => {
  t.plan(2)
  auth({username: 'eve', password: 'fooBar'}, (error, result) => {
    t.truthy(error)
    t.falsy(result)
    t.end()
  })
})

