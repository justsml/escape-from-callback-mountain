# Functional Promises

#### in Modern JavaScript

<br />

### by example

##### author: [Dan Levy](http://www.danlevy.net/)

---

#### Let's look at code samples for an `auth()` module.
##### 3 patterns: Callbacks, Async/Await, and Functional Promises

---
### Example 1/3: Callbacks
##### It's not too bad... Can we really "fix" this? (hint: yes)
---?code=src/auth.callbacks.js&lang=js
---
### Example 2/3: Async/Await ES6/7
##### Interesting, still a soup of commands though...
---?code=src/auth.async.js&lang=js
---
### Example 3/3: Functional Promises

* "Purer" functions === more testable & understandable. :+1:
* Named Functions let us more easily assemble & understand any HoC/Public method.
* Code reads like a story, and re-factoring feels more like programming visually in Scratch or building with LEGO&reg; bricks. :+1:

---?code=src/auth.fp.js&lang=js
#### Functional River Pattern

---

#### FPJS Requirements:

1. Uniform Function interface (single parameter)
1. More modular, flatter project/folder structure
1. Eliminate repetitive error handling

---

### Eliminate Ad Hoc Code
#### handling errors in nodejs
#### is usually verbose & sometimes painful

##### Redundant Error Handling

> [ press down key/arrow ]

+++?code=src/auth.old.js&lang=js

### "That's not terrible code."
#### I hear you say.


+++

## Error handling gets a bit silly fast using traditional Node callbacks.

> [ PRESS DOWN ARROW KEY ]

+++?code=src/auth.old.js&lang=js

@[6-8](one fish...)
@[11](one fish, two fish...)
@[14](one fish, two fish, err fish?)
@[16](... seriously, more err fish?)
@[18](... and another bit of error crap)

---

### Thanks for Watching/Reading

#### [See the Original Source Project(https://github.com/justsml/escape-from-callback-mountain/)
