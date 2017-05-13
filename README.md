# Escape from Callback Mountain!

## Refactoring NodeJS/JavaScript - a 2017 Guide

I am a big fan of Functional Programming and Modular JavaScript. This project's goal is to demonstrate better coding habits by guiding you through a refactor of some real-world NodeJS JavaScript code.

The overall [technique I demonstrate](#after) is what I call the **'Functional River' pattern**. Where your input/parameter/data is the water, and the code forms the riverbed. More or less.

To the Haskell pros out there, before you flame me for not defining 'monad', this is meant to be a more welcoming place. 
_So forgive me if I skip the overblown theory & jargon._


### 'Functional River' Goals/Benefits:

* Eliminate ad hoc logic.
* Less elaborate, modular code is naturally more reusable.
* Easier to move logic around - rebundle simple functions as needed to create new higher-order functions.
* Increased testability - eliminate hidden logic.
* Substantially faster code readability - versus [methods which muddles the important parts, and further hides ad hoc error/glue code](https://github.com/justsml/escape-from-callback-mountain/wiki/Beating-a-dead-horse%3F).

> Note: Relies on ideas from Lisp to SmallTalk - adapted to a JavaScript world.

#### Have feedback, fixes or questions? Please create issues or PRs. Or just complain at me on https://twitter.com/justsml

If you feel this subject has been thoroughly explored, please see my post [Beating a dead horse?](https://github.com/justsml/escape-from-callback-mountain/wiki/Beating-a-dead-horse%3F)

----------

## See both [Before](#before) and [After](#after) examples below.

## Before

![callback-mountain-before](https://cloud.githubusercontent.com/assets/397632/25775652/5e49b444-3267-11e7-937c-8b786da9314a.png)

## After

![callback-mountain-after](https://cloud.githubusercontent.com/assets/397632/25775651/5e499aae-3267-11e7-8f08-2150730189b4.png)

## Key Steps

1. [Step 1: Break Up The Big Functions](https://github.com/justsml/escape-from-callback-mountain/wiki/Step-1:-Break-Up-The-Big-Functions) - [PR #2: Flatten Functions](https://github.com/justsml/escape-from-callback-mountain/pull/2/files?diff=unified)
1. [Step 2: DRYer Code](https://github.com/justsml/escape-from-callback-mountain/wiki/Step-2:-DRYer-Code) - [PR #3: DRYer Code](https://github.com/justsml/escape-from-callback-mountain/pull/3/files?diff=unified)
1. [Step 3: Cleanup Code](https://github.com/justsml/escape-from-callback-mountain/wiki/Step-3:-Post-Cleanup) - [PR #5: Post Cleanup](https://github.com/justsml/escape-from-callback-mountain/pull/5/files?diff=unified)


## Pros & Cons

#### Pros

* Less ad hoc code results in:
  * More uniform code between different teams & developers,
  * Performance tooling & refactoring is an appreciably better experience,
  * More certainty about code correctness,
  * Higher code reuse.
* 100% Unit Testability
  * I often tell developers "Just because you can, doesn't mean you should" - this applies to the goal of 100% unit test coverage. Unit tests are costly, use as needed to validate/verify code correctness (for better ROI, use _integration_ or _black-box testing_),
  * Unit tests however uniquely prove you found, understand, AND resolved a given bug,
  * Faster bug resolution process,
* Flatter code hierarchy == less filler to remember
  * Re-organizing code is easier & less prone to bugs - with [Pure-ish Functions](https://en.wikipedia.org/wiki/Pure_function)


#### Cons

* Not as familiar.
* Something **new to learn**. Deal with it, you're a developer.
* If you have an existing project with lots of code, the unfortunate **reality is: Refactors Suck**.
* EventEmitter- & Stream-based code is not improved much, if at all, using this technique. 
  - Experiments include simple closures, extending Promise as an `EventEmitter`, or using Bluebird's `.bind` to pass a stream reference around.
  
## Concerns

#### Some really smart people out there have reservations about over-modularization.
![image](https://cloud.githubusercontent.com/assets/397632/25776158/12d0be56-3274-11e7-87c9-7dee8a5e4b09.png)

While true of other coding patterns, an overly-done flat & modular JS Project can get more disorganized over time. 

One solution I've found is to add a **Code Style Guide** preferably with naming conventions.
This becomes much **more important as team size grows**.

If done right, one of the pattern's **greatest strengths** is the ability to **relocate & rearrange** modules with **low risk**.

----------

#### Ultimately my goal is to better understand & advance Modular + Functional JS patterns. Hopefully I can sway some of the skeptics along the way :crossed_fingers:

-----------

> Review the [commit log](https://github.com/justsml/escape-from-callback-mountain/commits/master) to see every change. For a summary, check out the wiki to see higher level details of my refactoring approach.

Please read my (longer) related article [4 Functional JavaScript Techniques (with Examples)](https://github.com/justsml/blog/blob/master/_posts/functional-javascript-with-composition.md)


### Credits & Inspiration
- https://medium.com/javascript-scene/the-rise-and-fall-and-rise-of-functional-programming-composable-software-c2d91b424c8c
- https://medium.com/javascript-scene/the-two-pillars-of-javascript-ee6f3281e7f3
- https://twitter.com/ag_dubs/status/860900699382657025


