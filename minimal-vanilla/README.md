# Quick Start

### Run

```
npm i
node index.js
start http://localhost:5000
```

### Overview

```
npm install rijs
```

##### index.js
```js
var app    = require('express')()
  , server = require('http').createServer(app)
  , ripple = require('rijs').default(server)

ripple
  .resource('tweets', ['lorem', 'ipsum'])
  .resource('twitter-feed', function(d){
    this.innerHTML = '<li>' + d.join('</li><li>') + '</li>'
  })

server.listen(4000)

app.get('/', function(req, res){
  res.render('index.jade')
})
```

##### views/index.jade

```jade
doctype
html
  head
    script(src='/ripple.min.js')
  body
    twitter-feed(data='tweets')
```

##### Run the app

```shell
node index.js
```

### Reactive Data

Now open `localhost:4000` in two tabs and then try doing `push('new tweet!')(ripple('tweets'))` to add new data. 

![reactive-data](https://cloud.githubusercontent.com/assets/2184177/4209638/ce377c08-386b-11e4-9e80-362d888842ca.gif)

### Reactive Component (hot code push)

Or you could [try changing the implementation](https://github.com/rijs/examples/tree/master/minimal-vanilla) of the renderer by switching `green` to `red`, and watch the component update without a refresh:

![reactive-component](https://cloud.githubusercontent.com/assets/2184177/4209637/ce3396c4-386b-11e4-9c69-7be232382463.gif)

### More Examples 

You can also grab this demo by doing a `git clone` on the [vanilla example from the examples repo](https://github.com/rijs/examples) or explore the other examples.