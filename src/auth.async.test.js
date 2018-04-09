const test = require('ava')
const {auth, _checkArgs, _loginUser, _checkUser} = require('./auth.async')

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

test('async/await: auth(): login successful', async t => {
  t.plan(2)
  let user = await auth({username: 'alice', password: 'superSecret1'})
  t.is(user.username, 'alice')
  t.pass()
})

test('async/await: auth(): login failed', async t => {
  t.plan(1)
  try {
    let result = await auth({username: 'eve', password: 'fooBar!!'})
  } catch (ex) {
    t.truthy(ex)
  }
})

