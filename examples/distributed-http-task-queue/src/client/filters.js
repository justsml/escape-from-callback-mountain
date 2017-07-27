// This should be renamed actions

const Filters = module.exports = {
  log() {
    let args = [...arguments]
    console.log('FILTERS.LOG:', args)
    return args
  },
  save({key, value, _task}) {
    console.error('TODO: FILTERS.SAVE:', arguments)
    return {key, value, _task}
  }
}

