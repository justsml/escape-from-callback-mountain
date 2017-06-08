const measured = require('measured')
const stats = require('measured').createCollection()
const {Histogram, Timer, Counter, Meter} = measured

module.exports = function _ui() {
  const latency = new Histogram() //.update()
  const speed   = new Meter() // .mark([n])
  return {
    errors: {
      getCurrentRate: () => stats.toJSON()['errorRate'], // .mark()
      mark: (n = 1) => stats.meter('errorRate').mark(n),
    },
    latency: latency, //.update()
    speed: speed, // .mark([n])
    done() {
      speed.unref()
      // speed = null
      // latency = null
      // this.errorRate
    }
  }
}

