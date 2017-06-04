
module.exports = {
  TimeoutError:     errorFactory('TimeoutError'),
  ValidationError:  errorFactory('ValidationError'),
  NotFoundError:    errorFactory('NotFoundError'),
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
  const err = function(message, opts) {
    if (typeof message !== 'string') {
      // no string msg supplied, use err name as message, useful for functional chains & promise signalling through 'catch'
      opts     = message;
      message  = name;
    }
    var e = Error.call(this, message);
    if (typeof opts === 'object') { Object.assign(this, opts); }
    Object.assign(this, {name, message: e.message, stack: e.stack});
  }
  err.prototype              = Object.create(Error.prototype); // use plain ancestry
  err.prototype.constructor  = err; // override w/ our function
  err.prototype.name         = name;
  return err;
}
