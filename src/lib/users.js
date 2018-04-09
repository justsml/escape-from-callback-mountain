const Datastore = require('nedb')
const users     = new Datastore()

module.exports = {
  getOne,
  create,
  model: users,
}

function getOne(query) {
  return new Promise((resolve, reject) => {
    users.findOne(query, (error, user) => {
      if (error) return reject(error)
      resolve(user)
    })
  })
}

function create(user) {
  return new Promise((resolve, reject) => {
    users.insert(user, (error, user) => {
      if (error) return reject(error)
      resolve(user)
    })
  })
}
