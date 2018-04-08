const Datastore = require('nedb')
const users     = new Datastore()

module.exports = {
  getOne,
  create
}

function getOne({username, password}) {
  const query = arguments[0]
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
