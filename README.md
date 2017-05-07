# Escape from Callback Mountain!

## Refactoring NodeJS/JavaScript - 2017 Guide

I am a big advocate of Functional Programming and Modular JavaScript.

This is a guide & project on refactoring typical real-world NodeJS/JavaScript code.

### Project/Pattern Goals/Benefits:

* Eliminate ad-hoc logic.
* Less elaborate, modular code is naturally more reusable.
* It's easier to move logic around - rebundle simple functions as needed to create new higher-order functions.
* Increased testability - eliminate hidden logic.
* 2-3x faster code readability - versus methods which muddles the important parts, and further hides ad-hoc error/glue code.
* FP flavored solution!

> Note: Relies on ideas from Lisp to SmallTalk - adapted to a JavaScript world.

Also, forgive me if I skip any overblown theory & jargon. 

#### If anyone has feedback, fixes or questions, please create issues or PRs. Or just complain at me on https://twitter.com/justsml


> For this project I used [Bluebird Promises](http://bluebirdjs.com/docs/features.html). Apologies to `Promise Resistance Leader` [Brian Leroux](https://twitter.com/brianleroux).

----------

## See both [Before](#before) and [After](#after) examples below.

## Before

![callback-mountain-before](https://cloud.githubusercontent.com/assets/397632/25775652/5e49b444-3267-11e7-937c-8b786da9314a.png)

## After

![callback-mountain-after](https://cloud.githubusercontent.com/assets/397632/25775651/5e499aae-3267-11e7-8f08-2150730189b4.png)

## Key Steps

1. [PR #2](https://github.com/justsml/escape-from-callback-mountain/pull/2/files?diff=unified)
1. [PR #3](https://github.com/justsml/escape-from-callback-mountain/pull/3/files?diff=unified)
1. [PR #5](https://github.com/justsml/escape-from-callback-mountain/pull/5/files?diff=unified)

## Pros & Cons

#### Pros

* Less ad-hoc code results in:
  * More uniform code between different teams & developers,
  * Performance tooling & refactoring is an appreciably better experience,
  * More certainty about code correctness,
  * Higher code reuse.
* 100% Unit Testability
  * I often tell developers "Just because you can, doesn't mean you should" - this applies to the goal of 100% unit test coverage. Unit tests are costly, use as needed to validate/verify code correctness (for better ROI, use _integration_ or _black-box testing_),
  * Unit tests however uniquely prove you found, understand, AND resolved a given bug,
  * Faster bug resolution process,
* Flatter code hierarchy == less filler to remember
  * Re-organizing code is easier & less prone to bugs (with [Pure-ish Functions](https://en.wikipedia.org/wiki/Pure_function) )


#### Cons

* Not as familiar.
* Something **new to learn**. Deal with it, you're a developer.
* If you have an existing project with lots of code, the unfortunate **reality is: Refactors Suck**.

## Throwers of Shade (detractors)

#### Some really smart people out there have reservations about over-modularization:
![image](https://cloud.githubusercontent.com/assets/397632/25776158/12d0be56-3274-11e7-87c9-7dee8a5e4b09.png)

Admitedly a flatter/modular JS Project can get disorganized, especially over time. This is true of other coding styles.
One solution I've found is to add a **Code Style Guide** preferably with naming conventions.
This becomes much **more important as team size grows**.

If done right, one of the pattern's greatest strengths is the ability to relocate & rearrange modules with low risk.

----------

#### Ultimately my goal is to better understand & advance Modular + Functional JS patterns. Hopefully I can sway some of the skeptics along the way :crossed_fingers:

-----------

> Review the [commit log](https://github.com/justsml/escape-from-callback-mountain/commits/master), each step is included in this process. Next I will write on describing (concisely) my favorite refactoring approach.

Please read my (longer) related article [4 Functional JavaScript Techniques (with Examples)](https://github.com/justsml/blog/blob/master/_posts/functional-javascript-with-composition.md)

