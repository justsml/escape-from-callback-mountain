const test      = require('ava')
const express   = require('express')
const supertest = require('supertest')
const app       = require('./')

test.cb('GET /', t => {
  t.plan(2)

  supertest(app)
  .get('/')
  .set('Accept', 'application/json')
  .expect('Content-Type', /json|html/)
  .expect(200, (err, res) => {
    // console.warn('HOME REQUESTED:', err, res.body)
    if (err) throw err
    t.falsy(err)
    t.truthy(res.body)
    t.end()
  })
})

test.cb('POST /queue/', t => {
  t.plan(2)
  supertest(app).post('/queue')
    .send({url: `https://api.github.com/users/justsml/starred?page=20&per_page=10`, filters: ['save'], data: null})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, (err, res) => {
      // console.warn('QUEUE.PUT:', err, res.body)
      t.falsy(err)
      t.truthy(res.body.result._id)
      t.end()
    })
})
