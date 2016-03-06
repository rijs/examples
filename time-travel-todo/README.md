# TodoMVC and Time Travel

This example, built in the style of the [obligatory TodoMVC example](https://github.com/tastejs/todomvc/), is primarily to demo the automatic versioning of resources, using [versioned](https://github.com/pemrouz/versioned) and [immutable data structures](https://github.com/facebook/immutable-js) for memory efficiency and performance. Each versioned resource stores it's own historical states under the non-enumerable `log` property. You can rollback individual resources by providing the historical index as the second parameter to ripple. As with all changes, rolling back a resource will also automatically rerender the parts of your app that it affects:

```js
ripple('tweets', versioned([]))
push('lorem')(ripple('tweets'))
push('ipsum')(ripple('tweets'))

console.log(ripple.version('tweets', 0)) // switch to []
console.log(ripple.version('tweets', 1)) // switch to ['lorem']
console.log(ripple.version('tweets', 2)) // switch to ['lorem','ipsum']
```

Historical versioning about each resource is localised in each client node (i.e. it will not be cached in localStorage, or propagate to other client/server nodes). However, the functional operators emit a change diff on the resource in the format `{ key, value, type }`, which is used to synchronise with other nodes. This means replication works transparently with and without versioned resources.

Besides per-resource versioning, there is also a versioning for the entire application state, which is simply the aggregate of the index of each resource at a particular time. Every new version added for an individual resource will automatically result in a new record added to the application history. To time-travel, simply provide the time index you wish to move to:

```js
ripple.version(0)
ripple.version(10)
```

The `<timetravel-debugger />` is a simple visualisation of all application versions, the data in each resource (hover over it) and the ability to jump to that state (click it).

![image](https://cloud.githubusercontent.com/assets/2184177/6220345/2d46447e-b62d-11e4-843f-d62d3160d4f0.png)

This example also uses [rijs/export](https://github.com/rijs/examples/blob/master/time-travel-todo/package.json#L8) to bundle all the resources in `/resources` into [`dist/index.js`](https://github.com/rijs/examples/blob/master/time-travel-todo/dist/index.js), and [`rijs/minimal`](https://github.com/rijs/minimal) which is a lighter client-side only build of ripple (core + components). 

# Run

```
npm i
npm run build
start index.html
```