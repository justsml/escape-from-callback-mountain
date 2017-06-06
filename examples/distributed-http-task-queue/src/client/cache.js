
const Cache = module.exports = {
  set: ({key, value}, callback) => superagent
    .post(`${serverUrl}/cache/${encodeURIComponent(key)}`)
    .send({value})
    .then(res => callback(null, res.body), callback),
  get: (key, callback) => superagent
    .get(`${serverUrl}/cache/${encodeURIComponent(typeof key === 'object' ? key['key'] : key)}`)
    .then(res => callback(null, res.body), callback)
}
