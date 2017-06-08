const measured = require('measured')
const stats = require('measured').createCollection()
const {Histogram, Timer, Counter, Meter} = measured

module.exports = function _ui() {
  return {
    errors: {
      getCurrentRate: () => stats.toJSON()['errorRate'], // .mark()
      mark: (n = 1) => stats.meter('errorRate').mark(n),
    },
    latency: new Histogram(), //.update()
    speed: new Meter(), // .mark([n])
    done() {
      this.speed.unref()
      this.speed = null
      this.latency = null
      this.errorRate
    }
  }
}

