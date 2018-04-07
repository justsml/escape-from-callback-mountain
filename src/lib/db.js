const Promise   = require('bluebird')
const {hashString} = require('../lib/crypto')
const Datastore = Promise.promisifyAll(require('nedb'))
const models = {
  users: Promise.promisifyAll(new Datastore())
}

module.exports = {
  open,
  openAsync: Promise.promisify(open),
  getModel,
  getModelAsync: Promise.promisify(getModel),
  addUser,
  addUserAsync: Promise.promisify(addUser)
}

// Mocked db connection, returning test in-memory users collection/model
function open(callback = (x, y) => y || x) { return callback(null, {models}) }

function getModel(name, callback = (x, y) => y || x) {
  return callback(null, models[name])
}

// TODO: Relocate to users.js module somewhere around here
function addUser({id, username, email, password}, callback = (x, y) => y || x) {
  let users = getModel('users')
  return users.insert({
    id, username, email,
    password: hashString(password)
  }, (err, result) => {
    return users.findOne({id}, callback)
  })
}

