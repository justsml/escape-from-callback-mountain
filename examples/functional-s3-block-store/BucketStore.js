const BlockStore  = require('./')
/**
 * `BucketStore` class needs to be given a bucket in the constructor,
 * and it will use it in the example wrapped get/set methods.
 *
 * `BucketStore` shows how easy it is to build off simpler
 * functions, into more complex abstractions.
 *
 * There would be a fair bit more plumbing if the approach
 * were reversed (Class Instance inside 'Pureish' Functional JS).
 * This approach is therefore *less opinionated*.
 *
 * Consder composable functions as the most versatile path for your next project.
 *
 * @example
 * const bs = new BlockStore('backups-bucket')
 * bs.get({id: 'current-backup.tar.gz'})
 *   .then(stream => stream.pipe(fs.createWriteStream(__dirname + 'downloaded-backup.tar.gz')))
 */
class BucketStore {
  constructor(bucket) {
    this.bucket = bucket
  }
  // These methods default to the locally set bucket: this.bucket
  get(args) {
    return BlockStore.get(Object.assign({bucket: this.bucket}, args))
  }
  set(args) {
    return BlockStore.set(Object.assign({bucket: this.bucket}, args))
  }
}

module.exports = BucketStore
