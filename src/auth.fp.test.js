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

test('functional river: auth._checkArgs accepts valid creds', t => {
  t.plan(2)
  const args = _checkArgs({username: 'alice', password: 'superSecret1'})
  t.truthy(args.username)
  t.truthy(args.password)
})

test('functional river: auth._checkArgs rejects bad input', t => {
  t.plan(4)
  let result = null
  result = t.throws(() => _checkArgs({username: 'alice', password: 'no'}))
  t.truthy(/password/ig.test(result.message))
  result = t.throws(() => _checkArgs({username: '', password: 'secretPass'}))
  t.truthy(/username/ig.test(result.message))
})

test('functional river: auth._loginUser good creds', t => {
  t.plan(2)
  const result = t.notThrows(() => _loginUser({username: 'alice', password: 'superSecret1'}))
  t.truthy(result == undefined)
})

test('functional river: auth._loginUser invalid creds', t => {
  t.plan(1)
  return _loginUser({username: 'eve', password: 'haxor'})
    .then((user) => t.not(user))
})

test('functional river: auth._checkUser catches invalid null', t => {
  t.plan(2)
  const result = t.throws(() => _checkUser(null))
  t.truthy(/No User found/.test(result.message))
})

test('functional river: auth._checkUser catches bad object', t => {
  t.plan(2)
  const result = t.throws(() => _checkUser({id: 'id not allowed'}))
  t.truthy(/No User found/.test(result.message))
})

test('functional river: auth._checkUser returns good data', t => {
  t.plan(2)
  const result = t.notThrows(() => _checkUser({_id: 1, name: 'foo'}))
  t.truthy(result === undefined)
})

test('functional river: auth(): login successful', t => {
  t.plan(2)
  return auth({username: 'alice', password: 'superSecret1'})
    .then(result => {
      t.is(result.username, 'alice')
      t.pass()
    })
})

test('functional river: auth(): login failed', t => {
  t.plan(1)
  return auth({username: 'eve', password: 'fooBar'})
    .then(result => t.fail())
    .catch(err => t.pass())
})

