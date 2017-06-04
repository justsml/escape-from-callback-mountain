
module.exports = {asyncify}

function asyncify(obj = {}) {
  return Object.keys(obj)
  .filter(key => !/Async$/.test(key))
  .filter(key => Object.is(obj[key], Function))
  .reduce((obj, key) => {
    obj[`${key}Async`] = Promise.promisify(obj[key])
    return obj
  }, obj)
}

