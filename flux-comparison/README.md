# Flux Comparison + Browserify

This example was built to compare Ripple to [other Flux implementations](https://github.com/voronianski/flux-comparison). That is, focusing on just how it performs within one client instance and [simply not rippling/synchronising with other instances](https://github.com/pemrouz/ripple#ripple-vs-flux). As such, this is the first example which runs completely without a server.

This example also demonstrates how easy it is to interoperate Ripple with other strategies (see also [resource delivery via HTML Imports](https://github.com/pemrouz/ripple-examples/tree/master/time-travel-todo)). In this case, we use Browserify to bundle all resources. The API for registering a resource on the client is:

```js
ripple(name, body)
```

Or,

```js
ripple({ name: name, body: body })
```

So in the main app we [simply loop through all the files in the resources folder and register them](https://github.com/pemrouz/ripple-examples/blob/master/flux-comparison/app.js#L4-L13):

```js
var resources = bulk(__dirname, ['resources/*']).resources

Object
  .keys(resources)
  .forEach(register)

function register(name) {
  ripple({ 
    name: name
  , body: resources[name]
  })
}
```

# Run

```
npm i
watchify -t bulkify app.js -o build/bundle.js -v -d
open index.html
```
