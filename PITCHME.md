### 10 Rules of the 'Functional River' Pattern
##### _Or, "Mastering modern Functional JavaScript"_

> By: [Dan Levy](http://www.danlevy.net)
> Follow me on twitter/github: @justsml

---

1. Code must read like a story
1. Extract/move ad hoc code
1. Similar async & sync patterns where possible
1. Functions must use **uniform interfaces**
1. Pathways must be **well defined + changeable**
1. Strive to be **Flat & Highly Modular**
1. Complexity score should **rarely exceed NINE**
1. Immutable if possible
1. Functions should be (or derive from) pure & stateless functions

---

### 1: Code a story
> **For details, press DOWN arrow/key**

> **For next rule, press RIGHT arrow/key**
+++
Code should be readable for the next human. It helps to keep function complexity low (Rule No. 7).

In my opinion, a pipeline-style pattern should be used by all Public methods in a module.

![image](https://user-images.githubusercontent.com/397632/28991302-31268d8e-7943-11e7-9d67-28e172f9cbf2.png)


... Though if you don't code on a team, this might be a lot of work for an audience of 1.

---

### 2: Remove ad hoc logic
> **For details, press DOWN arrow/key**

> **For next rule, press RIGHT arrow/key**

+++

> **What is ad hoc logic?**

> It is a common violation of Single Responsibility (from SOLID). Identifying it only takes a little practice and discipline.

+++

To start, move your validation or data checks to their own functions. **Give your instructions meaning.** 

These 4 'red flags' are very helpful in your search:

+++

* 10+ expressions/statements in a function
* Co-mingling `if`'s with function calls inside huge 'super functions'
* Any `let`/`const`/`var` mid-function definition
* More than 1-3 lines before a `return`

> **Bottom line: Avoid complex execution trees.** Tiny functions usually always win.

---

### 3: Uniform sync and async
> **For details, press DOWN arrow/key**

> **For next rule, press RIGHT arrow/key**

+++

This is not literally desireable everywhere. 
However there is something really useful about utility functions & Bluebird Promise's array methods...

+++

> Can you make `isTest` function (next slide) async without affecting other code?
+++

```js
const leads = [...]
const isTest = (x) => x.test === true
return leads.map(isTest)
```

+++ 

Bluebird Promises solve this by extending `Array.prototype` methods into the "Promises" space.

+++
```js
const leads = Promise.resolve([...])
// Here's an async version of isTest():
const isTestUsingCallback = (x, cb) => setTimeout(() => cb(x.test), 0)
const isTestAsync = Promise.promisify(isTestUsingCallback)

return leads.map(isTestAsync)
```

##### Using the sync or async `isTest/isTestAsync` methods is same when using a Functional River!

---


### 4: Uniform functions
> **For details, press DOWN arrow/key**

> **For next rule, press RIGHT arrow/key**
+++
![image](https://user-images.githubusercontent.com/397632/29053594-34356f14-7bae-11e7-86df-cfe252d5f2bf.png)

---

### 5: Simple Paths
> **For details, press DOWN arrow/key**

> **For next rule, press RIGHT arrow/key**

+++
> Here's how too many 'exit points' leads to a delicate & unreadable mess... [press down arrow]
+++

![image](https://user-images.githubusercontent.com/397632/29008531-cd2b0cbc-7ad5-11e7-83fb-baa222d13cd3.png)

---

### 6: Flat & Modular
> **For details, press DOWN arrow/key**

> **For next rule, press RIGHT arrow/key**

+++

---

### 7: Low [Complexity Score](https://dzone.com/articles/measuring-code-complexity)
> **For details, press DOWN arrow/key**
> **For next rule, press RIGHT arrow/key**

+++
Code can be argued over stylistic points. But cyclomatic complexity is a number representing (roughly) the # of branches in a block of code.

---

### 8: Entangled Code Paths
> **For details, press DOWN arrow/key**
> **For next rule, press RIGHT arrow/key**

---

### 9: Immutable On Everything
> **For details, press DOWN arrow/key**
> **For next rule, press RIGHT arrow/key**

---

### 10: Pure & Stateless
> **For details, press DOWN arrow/key**
> **For next rule, press RIGHT arrow/key**

---

> Background: Over (roughly) the last 10 years, I've been gradually adopting & experimenting with these rules in my own projects. 
Some rules benefit all languages. Some rules only make sense for dynamic languages. 
And some of my rules are quite upsetting to some (and w/o JavaScript, I'd agree). 

Create an issue/PR to help/disagree with me :)
---

## Fin
