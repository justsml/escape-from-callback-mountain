const Promise = require('bluebird')
const openAsync = module.exports
     .openAsync = Promise.resolve()
     .then(() => ({
       models: { user: fakeSchema('user') }
     }))

function fakeSchema(name) {
  return {
    name,
    find:   (query) => [{id: 1, _id: 1, name: 'Jane Doe'}],
    update: (query, data) => true,
    delete: (id) => true,
    create: (data) => true,
  }
}
