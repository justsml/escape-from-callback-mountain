const test      = require('ava')
const supertest = require('supertest')
const app       = require('./server')


test.test('home: /', t => {
  t.plan(2)
  supertest(app)
  .get('/')
  .set('Accept', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .end((err, res) => {
    t.falsy(err)
    t.truthy(res.body)
  })
})

test.test('queue: put', t => {
  t.plan(1)
  supertest(app)
    .post('/queue')
    .set('Accept', 'application/json')
    .send({url: `https://api.github.com/users/justsml/starred?page=20&per_page=10`, filters: ['save'], data: null })
    .expect('Content-Type', /json/)
    .expect(200, (err) => t.falsy(err))
})
