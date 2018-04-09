const test = require('ava')
const {auth, _checkArgs, _loginUser, _checkUser} = require('./auth.fp')

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

test('fun. river: _checkArgs', t => {
  t.plan(2)
  const args = _checkArgs({username: 'alice', password: 'superSecret1'})
  t.truthy(args.username)
  t.truthy(args.password)
})

test('fun. river: _loginUser', t => {
  t.plan(2)
  const result = t.notThrows(() => _loginUser({username: 'alice', password: 'superSecret1'}))
  t.truthy(result == undefined)
})

test('fun. river: _checkUser', t => {
  t.plan(2)
  const result = t.throws(() => _checkUser(null))
  t.truthy(/No User found/.test(result.message))
})

test('fun. river: login successful', t => {
  t.plan(2)
  return auth({username: 'alice', password: 'superSecret1'})
    .then(result => {
      t.is(result.username, 'alice')
      t.pass()
    })
})

test('fun. river: login failed', t => {
  t.plan(1)
  return auth({username: 'eve', password: 'fooBar'})
    .then(result => t.fail())
    .catch(err => t.pass())
})

