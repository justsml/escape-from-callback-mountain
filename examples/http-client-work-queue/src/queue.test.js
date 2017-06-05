const test = require('ava')
const {dequeue, enqueueAsync} = require('./queue')

const dummyTasks = Array.from({length: 50}, (_, i) => i + 1)
  .map(n => `https://api.github.com/users/justsml/starred?per_page=10&page=${n}`)

test.test('enqueue', t => {
  t.plan(2)
  return enqueueAsync({url: dummyTasks[0], filters: ['save']})
  .then((result) => {
    // t.ifError(err)
    t.truthy(result._id)
    t.pass()
  })
  .catch(err => t.fail())
})

test.test('dequeue', t => {
  t.plan(3)
  return dequeue((err, item) => {
    t.ifError(err)
    t.truthy(item)
    t.pass()
  })
})
