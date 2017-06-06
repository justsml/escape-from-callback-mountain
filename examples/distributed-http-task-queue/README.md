# Multi Threaded HTTP Request Queue

This server-client topology is roughly a hub-and-spoke design.

It can scale up to roughly 200 nodes, bandwidth permitting.

See docker-compose.yml file to test clustered app.

### Server
#### Supports a single master node
* Exposes a generic task queue (/queue)
* Includes enqueue & dequeue, via GET & POST
* Queue backing is an in-memory DB by default (nedb)

```sh
npn run server
```

### Client
#### Supports 1-200 nodes
* Automatically balancing queue
* Loads tasks using intelligent polling
* Low/no-buffering overhead
* Adjusts to network conditions
* Failure/debouncing/backoff

```sh
npm run client
# Default hostname is localhost:9000
SERVER_HOSTNAME='localhost:9000' npm run client
# Add fixed err limit - may lose work partially consumed
MAX_ERROR=5 \
SERVER_HOSTNAME='localhost:9000' \
  npm run client
```
