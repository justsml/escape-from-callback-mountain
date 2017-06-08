# Multi Threaded HTTP Request Queue

See [docker-compose.yml](blob/master/docker-compose.yml) file for an example clustered app w/ _N_ client nodes.

The [Server](#server) implements basic REST interface of a task queue.
The [Client](#client) implements a queue consumer, it receives tasks describing the HTTP requests to make.

A Task looks like:

```js
{
  url: 'https://api.github.com/users/justsml/starred?page=20&per_page=10',
  filters: ['save']
}
// TLDR; we're going to GET the url
// filters are functions which can transform or process results in a composable way. currently only save is implemented, however you could easily do fancy things like enqueue additional tasks in response to data received - could be a good way to get multiple pages of search results.
```

-----------

### Table of Contents

1. [Diagram](#diagram)
1. [Getting Started](#getting-started)
  1. [Server](#server)
  1. [Client](#client)
1. [Roadmap](#roadmap)
1. [Notes](#notes)

-----------

## Diagram
This server-client topology is roughly a hub-and-spoke design.

![Multi threaded nodejs task queue flowchart](http://www.danlevy.net/images/multiplex-http-diagram.svg)

## Getting Started
Run `npm install && docker-compose -p http-queue up --build` to test the app with multiple virtual nodes.

See the Server and Client sections below for details on each logical app.

### Server
#### Supports a single master node

**[See Code/Entrypoint](blob/master/examples/distributed-http-task-queue/src/server/index.js)**

* Exposes a generic task queue (/queue)
* Includes enqueue & dequeue, via GET & POST
* Queue backing is an in-memory DB by default (nedb)

```sh
PORT=9000 npm run server
```

### Client
#### Supports 1-200 nodes

**[See Code/Entrypoint](blob/master/examples/distributed-http-task-queue/src/client/index.js)**

* Seed thread counts with info from `os.networkInterfaces()` and `os.cpus()`
* Automatically balancing queue - naturally limited by client/task speed.
* Loads tasks using intelligent polling - after success, auto dequeue & run next task.
* Low/no-buffering overhead - one task per X thread count + lazy demand-based consumer.
* Adjusts to network conditions - affecting either cluster communication or task completion.
* Failure/debouncing/backoff - how we handle those network conditions.

```sh
npm run client
# Default hostname is localhost:9000
SERVER_URL='http://localhost:9000' npm run client
# Add fixed err limit - may lose work partially consumed
ERR_LIMIT=5 \
SERVER_URL='http://localhost:9000' \
  npm run client
```


## Roadmap
* [x] multi-threaded
  - WIP: Using require('cluster')
  - Done: Multi-client
* [x] multi-staged / monadic design principles
* [x] auto balancing queue (using subscriber pattern)
* [x] net- & disk-bound logic organization (filters)
* [x] intelligent error handling/recovery - well, getting there.
* [ ] throttled/delayed
  - WIP: Auto adjust thread count. Based on +/-25% change in latency for 1 or 5 minutes. _Start with CPU count as limit, max-limit === 4xCPU Cores. Default error limits to 2xCPU count. Use measured.stats component?_
* [ ] scale tests to simulate up to 200 nodes
* [x] [hotdog/not hotdog AI](https://www.youtube.com/watch?v=ACmydtFDTGs)



### Notes

> #### Approach to Cluster Events/Communication Patterns

> I had lots of fun kicking around ideas for the overall subscriber/consumer implementation.
>
> Specifically: [ES7 Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield), [ZeroMQ](https://github.com/zeromq/zeromq.js), [NSQ](https://github.com/nsqio/nsq), [Kue](https://github.com/Automattic/kue), [Apache Kafka](http://kafka.apache.org/), [RxJS](https://github.com/Reactive-Extensions/RxJS), [BaconJS](https://baconjs.github.io/), et al. (n.b. these projects are not necessarily similar, as they can be combined interestingly. e.g. Kafka w/ RxJS consumer.)

> I've decided in favor of HTTP/REST, to avoid distracting with esoteric libraries.
**The point is constructing code that flows like a story.**





