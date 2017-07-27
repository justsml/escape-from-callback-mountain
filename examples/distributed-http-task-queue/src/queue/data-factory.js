const Promise     = require('bluebird')
const {enqueueAsync} = require('../queue')
const getUrls = (count = 4) => Array.from({length: count}, (_, i) => i + 1)
  .map(n => `https://api.github.com/users/justsml/starred?per_page=10&page=${n}`)

module.exports = {getUrls, initData}

function initData(n) {
  return Promise.resolve(getUrls(n))
    .mapSeries(url => ({url: url, filters: ['save']}))
    .map(task => enqueueAsync(task), {concurrency: 2})
    .reflect()
}
