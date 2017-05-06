# Escape from Callback Mountain!

## Refactoring NodeJS/JavaScript - 2017 Guide

This project relates to an article (in progress) [4 Functional JavaScript Techniques (with Examples)](https://github.com/justsml/blog/blob/master/_posts/functional-javascript-with-composition.md)

This repo illustrates how to refactor typical JavaScript using a more [FP-inspired](https://en.wikipedia.org/wiki/Functional_programming) pattern.

For this example I used Bluebird Promises (sorry @brianleroux) - [see all 4 methods are detailed in the article](https://github.com/justsml/blog/blob/master/_posts/functional-javascript-with-composition.md#part-2-four-composition-techniques-with-examples).

----------

#### Qualitative and quantitative improvements include:

- [x] More testable: ultimately less brittle code
- [x] Simpler refactors: lower rate of regressions and/or faster time-to-resolution.
- [x] Arguably easier to understand, even if harder to organize/write at first

## See both [Before](#before) and [After](#after) examples below.

## Before

![callback-mountain-before](https://cloud.githubusercontent.com/assets/397632/25775652/5e49b444-3267-11e7-937c-8b786da9314a.png)

## After

![callback-mountain-after](https://cloud.githubusercontent.com/assets/397632/25775651/5e499aae-3267-11e7-8f08-2150730189b4.png)

## Pros & Cons

#### Pros

* Less ad-hoc code results in:
  * More uniform code between different teams & developers,
  * Performance tooling & refactoring is an appreciably better experience,
  * More certainty about code correctness,
  * Higher code reuse.
* 100% Unit Testability
  * I often tell developers "Just because you can, doesn't mean you should" - this applies to the goal of 100% unit test coverage. Unit tests are costly, use as needed to validate/verify code correctness (for better ROI, use _integration_ or _black-box testing_),
  * Faster bug resolution process,
  * Unit tests can prove you found, understand, AND resolved the bug.
* Flatter code hierarchy === less filler to remember
  * Re-organizing code is easier & less prone to bugs with [Pure-ish Functions](https://en.wikipedia.org/wiki/Pure_function)

> To clarify:
* You wouldn't need to test a simple 'transform function' for example `const getName = (user) => user.name`
* With Unit Tests you validate things at a low level `with X data in, data Y expected out`
  

#### Cons

* Something **new to learn**. Deal with it, you're a developer.
* If you have an existing project with lots of code, the unfortunate **reality is Refactors Suck**



## Fin

> I hear you: "Am I _really_ gonna have to re-learn JavaScript?"
No, this is all possible in pure ES5 (though I used a bit of ES6)

> Review the [commit log](https://github.com/justsml/escape-from-callback-mountain/commits/master) - each step is included in this process. Next I will write on describing (concisely) my favorite refactoring approach.

