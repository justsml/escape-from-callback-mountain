module.exports = {
  TimeoutError:     errorFactory('TimeoutError'),
  QueueEmpty:       errorFactory('QueueEmpty'),
  NotFound:         errorFactory('NotFound'),
}

/**
* errorFactory
* Returns a new Error-based type using the given name.
*
* @example
* const TimeoutError = errorFactory('TimeoutError')
* throw new TimeoutError('Request timed out', {timeout: 10, restartable: true})
*/
function errorFactory(name) {
  function _Error(message, opts) {
    if (typeof message !== 'string') {
      // no string msg supplied, use err name as message, useful for functional chains & promise signalling through 'catch'
      opts     = message
      message  = name
    }
    var e = Error.call(this, message)
    Object.assign(this,
      typeof opts === 'object' ? opts : {},
      {name, message: e.message, stack: e.stack})
  }
  _Error.prototype              = Object.create(Error.prototype) // use plain ancestry
  _Error.prototype.name         = name
  _Error.prototype.constructor  = _Error // override w/ our function
  return _Error
}
