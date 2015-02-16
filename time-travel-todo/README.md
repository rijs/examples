# TodoMVC + HTML Imports + Immutability + Time Travel Debugger!

This example, built in the style of the [obligatory TodoMVC example](https://github.com/tastejs/todomvc/), is primarily to demo the new automatic versioning of resources, using [immutable data structures](https://github.com/facebook/immutable-js) for memory efficiency and performance. Each resource object internally has a new `versions` property which is an array of all it's historical states. You can rollback individual resources by providing the historical index as the second parameter to ripple. As with all changes, rolling back a resource will also automatically rerenders the parts of your app that it affects:

```js
ripple('tweets', [])
ripple('tweets').push('lorem')
ripple('tweets').push('ipsum')

console.log(ripple('tweets', 0)) // switch to []
console.log(ripple('tweets', 1)) // switch to ['lorem']
console.log(ripple('tweets', 2)) // switch to ['lorem','ipsum']
```

Historical versioning about each resource is currently deliberately localised in each client node (i.e. it will not be cached in localStorage, or propagate to other client/server nodes).

Besides per-resource versioning, there is also a versioning for the entire application state, which is simply the aggregate of the index of each resource at a particular time. Every new version added for an individual resource will automatically result in a new record added to the application history. To time-travel, simply provide the time index you wish to move to:

```js
ripple(0)
ripple(10)
```

The `<timetravel-debugger />` is a simple visualisation of all application versions, the data in each resource (hover over it) and the ability to jump to that state (click it).

This example also uses [HTML Imports](http://www.html5rocks.com/en/tutorials/webcomponents/imports/) as another mechanism for resource delivery. Contrast with other client-side registering approaches (Browserify) or [server-side registering approaches](https://github.com/pemrouz/ripple-examples/blob/master/minimal-vanilla/index.js#L5-L10).

# Run

```
npm i
just open index.html
```

(Note: Since we do not use a server here, you will need to run Chrome with `--disable-web-security` to be able to locally access files with HTML Imports)