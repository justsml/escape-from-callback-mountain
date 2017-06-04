const test = require('ava');
const {open, openAsync, getModel, getModelAsync} = require('./db')

test.test('open', t => {
  t.plan(2);
  return open((err, db) => {
    t.truthy(typeof db.models !== 'undefined')
    t.pass()
    return db.models
  })
})

test.test('getModel', t => {
  t.plan(2);
  return getModel('users', (err, users) => {
    t.truthy(typeof users !== 'undefined')
    t.pass()
    // return users
  })
})
