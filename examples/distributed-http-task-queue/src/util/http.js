const Promise         = require('bluebird')
const fetch           = require('node-fetch')
const {HttpError}     = require('../util/errors')
const {TimeoutError}  = require('../util/errors')
const timeout         = parseInt(process.env.HTTP_TIMEOUT || 8000, 10)

module.exports = {getUri, get: getUri, post, _parseJson, _checkHttpError}

function post(uri, data) {
  return Promise.resolve(uri)
    .timeout(timeout)
    .then(url => fetch(url, {
      method:     'POST',
      body:       JSON.stringify(data),
      headers:    {
        Accept:         'application/json',
        'content-type': 'application/json;charset=UTF-8'
      },
    }))
    .then(_checkHttpError)
    .then(_parseJson)
    .catch(Promise.TimeoutError, err => Promise.reject(new TimeoutError('Timeout', {baseError: err})))

}

function getUri(uri) {
  return Promise.resolve(uri)
    .timeout(timeout)
    .then(fetch)
    .then(_checkHttpError)
    .then(_parseJson)
    .catch(Promise.TimeoutError, err => Promise.reject(new TimeoutError('Timeout', {baseError: err})))
}


function _parseJson(res) {
  try {
    return JSON.parse(res.text())
  } catch(err) {
    console.error('\n\nERROR: Could not parse JSON!!!\n', res.text())
    return Promise.reject(new HttpError('Invalid JSON ' + err.message, res))
  }
}

function _checkHttpError(res) {
  return res.ok ? res : Promise.reject(new HttpError(response.statusCode + ': ' + response.statusText, res))
}


