// This should be renamed actions

const Filters = module.exports = {
  log() {
    let args = [...arguments]
    console.log('FILTERS.LOG:', args)
  },
  save({task, data}, callback) {
    console.error('TODO: FILTERS.SAVE:', args)
  }
}


