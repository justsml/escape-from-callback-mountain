
module.exports = {asyncify}

function asyncify(obj = {}, overrideExisting = false) {
  return Object.keys(obj)
  .filter(key => /Async$/.test(key) === overrideExisting)
  .filter(key => Object.is(obj[key], Function))
  .reduce((o, key) => {
    o[`${key}${overrideExisting ? '' : 'Async'}`] = Promise.promisify(o[overrideExisting ? key.replace(/Async$/, '') : key])
    return o
  }, obj)
}

