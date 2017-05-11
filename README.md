# Escape from Callback Mountain!

## Refactoring NodeJS/JavaScript - 2017 Guide

I am a big advocate of Functional Programming and Modular JavaScript.

This is a guide & project on refactoring typical real-world NodeJS/JavaScript code. I refer to the overall technique used as a 'Flowing River Pattern'.

### Pattern Goals/Benefits:

* Eliminate ad hoc logic.
* Less elaborate, modular code is naturally more reusable.
* It's easier to move logic around - rebundle simple functions as needed to create new higher-order functions.
* Increased testability - eliminate hidden logic.
* 2-3x faster code readability - versus methods which muddles the important parts, and further hides ad hoc error/glue code.
* FP flavored solution!

> Note: Relies on ideas from Lisp to SmallTalk - adapted to a JavaScript world.

Also, forgive me if I skip any overblown theory & jargon. 

#### If anyone has feedback, fixes or questions, please create issues or PRs. Or just complain at me on https://twitter.com/justsml

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

## Concerns

#### Some really smart people out there have reservations about over-modularization.
![image](https://cloud.githubusercontent.com/assets/397632/25776158/12d0be56-3274-11e7-87c9-7dee8a5e4b09.png)

When overly-done, a flatter/modular JS Project can get disorganized, especially over time. 
This is also true of other coding styles, and simply .

One solution I've found is to add a **Code Style Guide** preferably with naming conventions.
This becomes much **more important as team size grows**.

If done right, one of the pattern's **greatest strengths** is the ability to **relocate & rearrange** modules with **low risk**.

----------

#### Ultimately my goal is to better understand & advance Modular + Functional JS patterns. Hopefully I can sway some of the skeptics along the way :crossed_fingers:

-----------

> Review the [commit log](https://github.com/justsml/escape-from-callback-mountain/commits/master), each step is included in this process. Next I will write on describing (concisely) my favorite refactoring approach.

Please read my (longer) related article [4 Functional JavaScript Techniques (with Examples)](https://github.com/justsml/blog/blob/master/_posts/functional-javascript-with-composition.md)


### Credits & Inspiration
- https://medium.com/javascript-scene/the-rise-and-fall-and-rise-of-functional-programming-composable-software-c2d91b424c8c
- https://medium.com/javascript-scene/the-two-pillars-of-javascript-ee6f3281e7f3



