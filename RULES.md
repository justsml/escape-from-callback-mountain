# The Functional River's 10 Commandments 
### _Or how to master modern Functional JavaScript_

> Note: The religious overtones are a joke, there is no "one true way" in software. 

Over roughly 10 years, I've been gradually adopting & experimenting with these rules in my own projects. 

Some rules benefit devs of all backgrounds. Some rules only make sense for dynamic languages. 
And some of my rules are quite upsetting to some (and w/o JavaScript, I'd agree). 
Please read on to see how these constraints are in-fact empowering.

#### My main goal is JavaScript that resembles beautiful prose or poetry

### FPJS - 10 Commandments

1. Thou code must read like a story
1. Thou will not covet ad hoc logic
1. Thou async code must mirror sync patterns
1. Thou functions must use uniform interfaces
1. Thou code pathways must be well defined and easy to change
1. Thou project is Flat & Highly Modular
1. Thou Function Complexity score should rarely exceed 9
1. [Thou shall avoid the plague of Entangled Code Paths](#entangled-code-paths)
1. Thou must treat everything as Immutable
1. Thou code must remain pure & stateless


#### Code a story
Code should be readable for the next human. It helps to keep function complexity low (Rule No. 7).

In my opinion, a pipeline-style pattern should be used by all Public methods in a module.

![image](https://user-images.githubusercontent.com/397632/28991302-31268d8e-7943-11e7-9d67-28e172f9cbf2.png)


... Though if you don't code on a team, this might be a lot of work for an audience of 1.


#### Remove ad hoc logic

What is ad hoc logic? 

It's a common violation of Single Responsibility (from SOLID). Identifying it takes a little practice and discipline. 

To begin fixing it, move your validation or data checks to their own functions. **Give your instructions meaning.** 

These 4 'red flags' are very helpful in your search:

* 10+ expressions/statements in a function
* Co-mingling `if`'s with function calls inside huge 'super functions'
* Any `let`/`const`/`var` mid-function definition
* More than 1-3 lines before a `return`

> **Essentially: Avoid complex execution trees.** Tiny functions usually always win.

#### Uniform sync and async

This is about the magic of utility functions & Bluebird Promise's array methods.

Here's a situation:
Can you make `isTest` function (below) async without affecting other code?

```js
const leads = [...]
const isTest = (x) => x.test === true
return leads.map(isTest)
```

Bluebird Promises solve this by extending `Array.prototype` methods into the "Promises" space.

```js
const leads = Promise.resolve([...])
// Here's an async version of isTest():
const isTestUsingCallback = (x, cb) => setTimeout(() => cb(x.test), 0)
const isTestAsync = Promise.promisify(isTestUsingCallback)

return leads.map(isTestAsync)
```

##### Using the sync or async `isTest/isTestAsync` methods is same when using a Functional River!




#### Uniform functions

#### Simple Paths

> Too many 'exit points' leads to a delicate unreadable mess:

![image](https://user-images.githubusercontent.com/397632/29008531-cd2b0cbc-7ad5-11e7-83fb-baa222d13cd3.png)

#### Flat & Modular

#### Low [Complexity Score](https://dzone.com/articles/measuring-code-complexity)

Code can be argued over stylistic points. But cyclomatic complexity is a number representing (roughly) the # of branches in a block of code.

#### Entangled Code Paths

#### Immutable On Everything

#### Pure & Stateless


