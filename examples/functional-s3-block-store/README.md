# S3-compatible Functional River Example

### Pluripotency with Functional JavaScript

- [x] S3-compatible block storage client (w/ simplified names & interfaces)
- [x] Class-based implementation
- [x] Middleware implementation
- [x] Test core index.js


### This example is designed to show how versatile a flat, and modular functional JS design can be.

> Using the combination of techniques on my project README, you can gain independence from changing libraries & thread patterns. We get less "lock-in" because the pattern is portable across other libraries.

#### The `index.js` is meant to be a simple wrapper, the important bits to review are `middleware.js` and `BucketStore.js` - much more interesting.

The class version, `BucketStore.js`, has 1 bit of internal state, `this.bucket`. You could track auth tokens or other local/private data like this.

The example "class-calling code" below shows how Functional JS can be easily concealed or co-exist with older patterns/modules. IMHO, it achieves the most important thing: considerably improve any existing patterns, without negative spill-over effects.

##### Before you laugh saying "Yea, nope. Close tab." This is indeed possible with modern techniques, though decidedly impossible with older "Promise" libraries.

#### I know this may sound upside down, but that's why it's critical to follow ALL 3 steps in my Functional River guide. Skipping any part is like stopping antibiotics early. Keep applying the rules and your code will quickly shape up.

> The boundaries between functions/modules/files should feel more & more fluid with practice.
> So, please try ensure your classes don't make code much more difficult to relocate than necessary.

```js
const BucketStore = require('./BucketStore.js')
const bs = new BlockStore('backups-bucket')

bs.get({id: 'current-backup.tar.gz'})
  .then(stream => stream.pipe(fs.createWriteStream(__dirname + 'downloaded-backup.tar.gz')))
  .catch(err => console.error('BlockStore Failed: ', err))
```

