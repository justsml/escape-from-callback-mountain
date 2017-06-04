const test = require('ava');
const {hashString, hashStringAsync} = require('./crypto')

test('crypto.hashString', t => {
  let hashed = hashString('superSecret1')
  t.is(hashed, 'a7c5d06e8f92c7c856cf2d8252c0b0de527278dea05f7d37811722905a007d17')
  t.pass()
})
