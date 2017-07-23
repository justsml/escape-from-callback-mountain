# Functional Promises

#### in Modern JavaScript

<br />

### by example

##### author: [Dan Levy](http://www.danlevy.net/)

---

### "Is anything wrong with the following NodeJS code?"

---?code=src/auth.old.js&lang=js

# Yes
### but it's not the worst code...

#### "Why refactor?"

> It has enough complexity to
> demonstrate real solutions for
> often-overlooked issues I find
> in real-world NodeJS/JavaScript code.


---

#### Let's identify some tangible improvments:

1. Uniform interfaces                   |
1. Brittle & ad hoc logic               |
1. More modular, flatter, reusable      |

---

### Eliminate Ad Hoc Code
#### handling errors in nodejs
#### is usually verbose & sometimes painful

# Redundant Error Handling

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

# Thanks for Watching/Reading
