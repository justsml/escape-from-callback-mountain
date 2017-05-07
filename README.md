# Escape from Callback Mountain!

## Refactoring NodeJS/JavaScript - 2017 Guide

I am a big advocate of Functional Programming and Modular JavaScript.

This is a guide & project on refactoring typical real-world NodeJS/JavaScript code. 
_Code like it's 2017! ... and stop writing like it's 2009, that's like 500 code-years._

### Project Goals/Benefits:

* Less elaborate, modular code is naturally more reusable.
* It's easier to move logic around - rebundle simple functions as needed to create new higher-order functions.
* Increased testability - eliminate hidden logic.
* 2-3x faster code readability - versus longer code which muddles the important parts, and hides ad-hoc logic.
* FP flavored solution!

> Note: Relies on ideas from Lisp to SmallTalk - adapted to a JavaScript world.

Also, forgive me if I skip any overblown theory & jargon. 


### Some really smart people out there have reservations about over-modularization:
![image](https://cloud.githubusercontent.com/assets/397632/25776158/12d0be56-3274-11e7-87c9-7dee8a5e4b09.png)

#### My goal is to better understand & advance Modular + Functional JS patterns. Hopefully I can sway some of the skeptics along the way :crossed_fingers: 😣.


### If anyone has feedback, fixes or questions, please create issues or PRs.

Admitedly a modular JS Project can get disorganized, especially over time. 
However, if done right, one of the pattern's greatest strengths is the ability to relocate & rearrange modules with low risk. 


Read my related article (in progress) [4 Functional JavaScript Techniques (with Examples)](https://github.com/justsml/blog/blob/master/_posts/functional-javascript-with-composition.md)

This repo illustrates how to refactor typical JavaScript using a more [FP-inspired](https://en.wikipedia.org/wiki/Functional_programming) pattern.

For this project I used [Bluebird Promises](http://bluebirdjs.com/docs/features.html). Apologies to `Promise Resistance Leader` [Brian Leroux](https://twitter.com/brianleroux).

----------

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

