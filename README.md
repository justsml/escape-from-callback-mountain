# Escape from Callback Mountain v2.1

[![Build Status](https://travis-ci.org/justsml/escape-from-callback-mountain.svg?branch=master)](https://travis-ci.org/justsml/escape-from-callback-mountain)

## Refactoring JavaScript w/ Functional River Pattern

I am a big fan of Functional Programming and Modular JavaScript. This project's goal is to demonstrate the latest Functional Promise patterns, while taking you through a refactor of real world callback-based NodeJS/JavaScript.

#### Functional River Overview
![Functional River Highlights](https://user-images.githubusercontent.com/397632/38474143-e96bf632-3b57-11e8-8589-cbe3b3782d1a.gif)

The [technique I demonstrate](#after) is what I call the **_Functional River_ pattern**. Your input/parameters/data is the water, and the code forms the riverbed. More or less.
It is an async+sync version of the [Collection Pipeline](https://martinfowler.com/articles/collection-pipeline/) pattern.

> To the Haskell pros out there, before you flame me for not defining 'monad', this is meant to be a more welcoming place.
_So forgive me if I skip the overblown theory & jargon._

### _Functional River_ Goals/Benefits:

* Higher level logic implemented with **multiple smaller single-purpose functions, assembled to read like a story.**
* Decoupled modules are easier to maintain & upgrade over time.
* Reduce bugs by relocating ad hoc logic. (e.g. one-off transformations, untested validation)
* Use same interface for both synchronous & asynchronous code. (`promise.then(value => alert(value))`)
* Prefer immutable, stateless code as essential building blocks.
* Less elaborate, modular code is naturally more reusable.
* Easier to move logic around - rebundle simple functions as needed to create new higher-order functions.
* Increased testability - eliminate hidden surface area.
* Substantially faster code readability - versus artisinal functions assembled with ad hoc code glue ([a Big Ball of Mud](https://en.wikipedia.org/wiki/Big_ball_of_mud)).

> Note: The Functional River Relies on ideas from Lisp to SmallTalk - adapted to a JavaScript world.
> Apologies to `Promise Resistance Leader` [Brian Leroux](https://twitter.com/brianleroux). For alternative patterns please read my more detailed article demonstrating [4 JavaScript Composition Techniques (with Examples)](http://www.danlevy.net/2017/03/10/functional-javascript-composition/)

#### Have feedback, fixes or questions? Please create [issues](https://github.com/justsml/escape-from-callback-mountain/issues/new) or [Pull Requests](https://github.com/justsml/escape-from-callback-mountain/compare). Or DM me at [twitter @justsml](https://twitter.com/justsml).

If you feel this subject has already been exhauted, please see my post [Beating a dead horse?](https://github.com/justsml/escape-from-callback-mountain/wiki/Beating-a-dead-horse%3F)


## Key Steps

1. [Step 1: Break Up The Big Functions](https://github.com/justsml/escape-from-callback-mountain/wiki/Step-1:-Break-Up-The-Big-Functions) - read the code: [PR #2: Flatten Functions](https://github.com/justsml/escape-from-callback-mountain/pull/2/files?diff=unified)
1. [Step 2: DRYer Code](https://github.com/justsml/escape-from-callback-mountain/wiki/Step-2:-DRYer-Code) - read the code: [PR #3: DRYer Code](https://github.com/justsml/escape-from-callback-mountain/pull/3/files?diff=unified)
1. [Step 3: Cleanup Code](https://github.com/justsml/escape-from-callback-mountain/wiki/Step-3:-Post-Cleanup) - read the code: [PR #5: Post Cleanup](https://github.com/justsml/escape-from-callback-mountain/pull/5/files?diff=unified)


## Pros & Cons

#### Pros

* Less ad hoc code results in:
  * More uniform code between different teams & developers,
  * Performance tooling & refactoring is an appreciably better experience,
  * More certainty about code correctness,
  * Higher code reuse.
* 100% Unit Testability
  * Unit tests uniquely prove you found, understand, AND resolved a given bug,
  * Faster bug resolution process,
* Flatter code hierarchy == less filler to remember
  * Re-organizing code is easier & less prone to bugs - with [Pure-ish Functions](https://en.wikipedia.org/wiki/Pure_function)


#### Cons

* Performance. I've run some micro-benchmarks - it's not awesome. However, 3 important things:
  1. It's **not meaningfully slower in real world applications.**
  1. If it is necessary, performance analysis & tuning is a much improved experience. Smaller functions make it easier to see where slow code lurks - especially if you profile unit tests.
  1. As more people adopt these patterns, things will improve. V8/Chrome has been impressively fast at optimizing for emerging patterns.
* Debugging can be more difficult. Though I have updated my dev tricks to debug this style of code, even without the confort of Bluebird's error handling. I'll add more sample scripts for this later.
* Something **new to learn**. Deal with it, you're a developer.
* If you have an existing project with lots of code, the unfortunate **reality is: Refactors Suck**.
* EventEmitter- & Stream-based code is not improved much, if at all, using this technique. Look into RxJS
  - Ongoing experiments include simple closures, extend Promise with `EventEmitter`, or using Bluebird's `.bind` to inject variable state into the Promise chain. (I know, "ugh side-effects, gross." PRs welcome.)


## Pattern Showdown

#### [View Callback Comparison](docs/comparison-callbacks.md)



## Summary

It's perhaps true that an overly-done flat & modular JS Project can feel more disorganized over time. New practices & approaches must be explored (from monorepos, to breaking up modules when-needed to meet org/dev/deployment needs).

Project and code discipline is just as important as it's always been. Also, the community is still developing consensus around Functional JS patterns, immutability and overall project organization.

When done right, one of _Functional River's_ **greatest strengths** is the ability to **relocate & rearrange** modules with **low risk**. If this still feels risky, your modules are probably still too entangled (coupled).

----------

#### Ultimately my goal is to better understand & advance Modular + Functional JS patterns. Hopefully I can interest some of the skeptics along the way :crossed_fingers:

-----------

### Please Star this project ❤️

--------------

## Wiki Contents

### [Wiki Main](https://github.com/justsml/escape-from-callback-mountain/wiki)

* Steps
  1. [Step 1: Break Up The Big Functions](https://github.com/justsml/escape-from-callback-mountain/wiki/Step-1:-Break-Up-The-Big-Functions)
  1. [Step 2: DRYer Code](https://github.com/justsml/escape-from-callback-mountain/wiki/Step-2:-DRYer-Code)
  1. [Step 3: Cleanup Code](https://github.com/justsml/escape-from-callback-mountain/wiki/Step-3:-Post-Cleanup)
* Related Articles
  * [Finding Promise Anti-patterns](https://github.com/justsml/escape-from-callback-mountain/wiki/Beating-a-dead-horse%3F)
  * [What about Async, Await and Generators?](https://github.com/justsml/escape-from-callback-mountain/wiki/What-about-Async,-Await-and-Generators%3F)
* [Examples](https://github.com/justsml/escape-from-callback-mountain/blob/master/examples/)
  * [**HTTP Client Work Queue**](https://github.com/justsml/escape-from-callback-mountain/wiki/Example:-HTTP-Client-Work-Queue)
  * [**Typed Errors**](https://github.com/justsml/escape-from-callback-mountain/blob/master/examples/typed-errors/auth.js#L18-L33)
  * [**S3 File API w/ Express Middleware & Class wrapper**](https://github.com/justsml/escape-from-callback-mountain/tree/master/examples/functional-s3-block-store)

-----------

### Credits & Inspiration

I highly recommend reading (or watching) every single link here.

- Tom Stuart's Purely Amazing [Programming with Nothing](http://codon.com/programming-with-nothing)
- Eric Elliot's Tour de force: [The Two Pillars of JavaScript](https://medium.com/javascript-scene/the-two-pillars-of-javascript-ee6f3281e7f3)
- Ashley Williams Speaks The Modular Tructh in [A Brief History of Modularity | JSConf EU 2017](https://youtu.be/vypCsVm5z28)
- And Eric's [Rise and Fall and Rise of Functional Programming (Composing Software)](https://medium.com/javascript-scene/the-rise-and-fall-and-rise-of-functional-programming-composable-software-c2d91b424c8c) is damn good too ;)
- Martin Fowler expertly lays down the Ruby + Haskell pipeline in [Collection Pipeline](https://martinfowler.com/articles/collection-pipeline/)


------------


#### v2.0 Released
### Escape from Callback Mountain Key Updates

1. README now more focused on the _Functional River_ pattern.
    * Counter-examples are still included in `./src`, just not featured on README.
1. There's an updated production-ready library [`Functional Promises`](https://github.com/functional-promises/functional-promises) which grew out of the feedback & research from this Project.

