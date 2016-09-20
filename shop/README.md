# Polymer Shop

This is a comparative demo application based off the [Polymer shop](https://www.polymer-project.org/1.0/toolbox/case-study). I found this case study particularly interesting because the goal is to optimise the overall experience for the user (with lots of neat tricks!), whilst many other discussions/solutions are often focused on "optimising DX", "the best architecture", "the purest or most functional solution", etc without there being much discussion on how users are affected by those decisions. The two are not mutually exclusive, but it's good to see some more balance.

The purpose of this example is not to directly compare implementations, but to help explain/discuss some higher-level aspects of a typical Ripple application.

### App Structure

Both apps use Custom Elements, but in a very different manner. In Polymer, components are a mix of some [custom markup](https://github.com/Polymer/shop/blob/b8c94a8567ca23a66e617ac8f2a43b4e345f3fb4/src/shop-list.html#L106-L112) plus some [imperative JS](https://github.com/Polymer/shop/blob/131830536c815efbab4781e1342f2c040cf25857/src/shop-cart-modal.html#L134-L162). I think these are both sub-optimal for reasons [discussed here](https://github.com/rijs/docs/blob/master/components.md#jquery). The TL;DR is:

- Imperative code means you can end up in a lot of different states and code complexity is exponentially proportional to the number of different of states. You may get away with this on a small app, but the problem becomes more evident on larger apps.
- The HTML-esque part partially re-invents logic from JS (if/loops/etc), is difficult to extend/compose/optimise, and it still requires JS which means your view logic is now split across two places.

With Ripple, you just register your component and it lazily upgrades instances too. However, [every component is just a function](https://github.com/websdk/vanilla#vanilla) (both stateless and stateful). It has a fractal/unidirectional architecture, so whenever there is a change, the component is redrawn (and it's children recursively). It's actually agnostic to what grammar you use inside, but I use [once](https://github.com/utilise/once#once), which means views that are _declarative_ and _just JS_. Once also performs the absolute minimal number of DOM operations required, without having to construct and maintain some special intermediate representation (vdom).

### Lazy Load Everything

A major emphasis by Google is to try to load as little as necessary (see [PRPL](https://www.polymer-project.org/1.0/toolbox/server)). I couldn't agree more with this - this is my biggest dislike with most existing SPA's: they essentially put their entire app into one bundle, which is convenient, but means users wait much longer than necessary.

Whilst Polymer's Shop is very fine tuned in this regard, [this doesn't come for free](https://github.com/Polymer/shop/blob/49fc752942f718dbf1d6055bab45bfc95567e2c7/src/shop-app.html#L388-L422) (or with any other solution as far as I am aware today). Typically, it relies on you having to split your bundles which is subjective, another cognitive overhead, and will still be unavoidably wasteful. If you're using HTTP/2 + HTML Imports (i.e. Chrome), this works better as you don't have to bundle (but you are unnecssarily leaving are very large number of other users in the dark imho).

Ripple eliminates over/under-fetching by transparently lazy loading everything as you use them. The [backpressure module](https://github.com/rijs/backpressure#ripple--backpressure) layers in this behaviour by [adding render middleware]( https://github.com/rijs/fullstack#rippledraw) (i.e. decorating Element.prototype.draw) to pull resources as needed. It's also possible to preload ahead by using `ripple.pull` for more advanced use cases (e.g. guessing intent). This means if you completely refactor a component implementation, there's absolutely nothing else to update. Add any custom element to the page, and it will fetch it and it's dependencies if it hasn't already loaded them. Instead of babelifying everything, I'm also planning another middleware transformation function which sends clients the minimum transformed version using buble.

For subresources a client has pulled, it's also noted on the socket itself, so that client will be pushed all future updates for those resources (which then triggers a redraw of things that use those subresources).

This also means hot loading for all subresources work out of the box.

### WebSockets vs HTTP2

The key to fast delivery is to load the minimum amount required, then stream in updates and progressively enhance as they arrive. Underlying this, it means we need an efficient way to do fine-grained client-server communication since multiple roundtrips in HTTP/1.1 is prohibitively expensive.

Polymer relies on HTTP/2 for this, whilst Ripple currently uses WebSockets.

The cons with both options are of a similar nature: upgrading/configuring servers and proxies (e.g. any proxy/router/browser can ignore a server push or upgrade header). WebSockets has the advantage here since it has been around longer and infra support is years ahead.

WebSockets is also better in terms of features, since it gives you all the benefits of HTTP/2, but you can actually push fine-grained changes at the application level. You can server push with HTTP/2, but this pushes resources to you browser cache, not your application (and you don't get any notifications). Pushing from the client is also different than making a `fetch` in HTTP/2, since albeit they are compressed, you are still sending unnecessary headers which means that approach breaks down if you are streaming lots of small updates.

It's possible to rewrite the [sync module](https://github.com/rijs/sync#ripple--sync) of two Ripple nodes to use HTTP/2, but there doesn't seem to be any benefit in doing this right now.

In both cases, there are fallback options. With Polymer, you can bundle your app, but you still need to do some work to serve HTTP/1 and HTTP/2 clients differently. With [rijs/fullstack](https://github.com/rijs/fullstack#ripple), it uses the battle-tested socket.io, so just falls back to polling if WS is not available (which is as good as the HTTP/2 solution if available). Or you can you just bundle up your resources like traditional apps today, and use the client-side only [rijs/minimal](https://github.com/rijs/minimal#minimal) build.

### Offline

Ripple caches subresources into localStorage (if you are streaming lots of updates, it lets it settle down for a bit first). Even before any network interaction, the [offline module](https://github.com/rijs/offline) renders the entire app from the last known good state, using resources cached in localStorage. You can control which subresources are cached via the cache header. This often means highly dynamic or user-specific content is not cached, but as much of your structural components/content are (think finer-grained version of the [app-shell architecture](https://developers.google.com/web/updates/2015/11/app-shell?hl=en) instead of a hard arbitrary split). Once the connection is established, updates stream in and the relevant parts of the app are re-rendered. This has a HUGE impact on how fast your application startup is perceived.

Polymer takes this further by using Service Workers which does something similar with caching subresources, but acutally lets you use the app offline. There is work planned to enhance the Ripple offline module to cache/load using Service Workers where available too, which should automagically upgrade all Ripple applications to work offline when released. Older browsers will still get the huge startup boost where Service Worker is not available.

### Routing

Polymer uses Custom Elements as part of it's routing. I spent some time flirting with the idea that routes should be co-located with components because composition. My conclusion is this is a very bad idea. Routes mixed with your DOM structure is very brittle. Conceptually, routing is a top-level concern, it happens at the intersection of the page URL (browser address bar) and your top app component. In this app, I unwrap the url and params from a list of routes and then pass down relevant params as data to children. Sub-components don't care where that data comes from, but can go on to pass down or implement their own conditional logic (e.g. show panel A or B). This also works better for universal routing - you can simply do `app.use(router(routes))`. If, for example, you visit a protected route, you don't need to render the page to only find you need to issue a redirect to the login page. Lazy-loading routes happens by treating your routes as another subresource and just having your top-level component depend on them.

My other problem with existing routers, is that they all result in a poor URL experience. For example, access https://shop.polymer-project.org/wat and it's broken. Traditionally, routes are defined with a list. This is inefficient and difficult to maintain as your list grows - it's likely you will miss some gap. Aligning your routes with DOM structure only further complicates the difficulty in doing this. There's a [new class](https://github.com/pillarjs/routington) [of routers](https://github.com/websdk/rhumb#rhumb) that leverage tries internally to add more structure and performance. In [decouter](https://github.com/pemrouz/decouter), you get to _define_ your routes as a trie (a trie of functions to be precise), which results in a much tighter definition of the behaviour around your routes.

### Framework Size

Polymer.html is 88.5 KB (ignoring the application also loads polymer-mini [36.9 KB] and polymer-micro.html [13.3 KB]).

rijs/fullstack on the other hand is 57.5 KB, but that's the equivalent of Relay ([Sync](https://github.com/rijs/sync#ripple--sync)) + Redux ([Core](https://github.com/rijs/core#ripple--core)) + React ([Components](https://github.com/rijs/components#ripple--components)) + Lodash ([Utilise](https://github.com/utilise/utilise#lean-javascript-utilities-as-micro-libraries)).

Actually - [the whole thing is only ~5 KB](https://github.com/rijs/fullstack/blob/master/dist/ripple.pure.min.js.gz) :) The rest is socket.io-client. I was considering switching socket.io for something else or rewriting, but it seems like [the library maintainers already have this planned](https://twitter.com/rauchg/status/772974130022842368).

It's also worth nothing the difference in codebase size. The Polymer version relies on a large number of third-party components for functionality and has a lot of code for each component. You can read all the Ripple components without scrolling. There are no dependencies (other than the router).

### Load Comparison

If you run the unbundled Polymer version in Firefox/Edge, it's unholy slow. If you run the bundled version, the page takes several seconds to load (this is all running from localhost).

In all browsers, the Ripple home page is consistently instant.

In Chrome, the timeline performance is comparable. You will notice by any measure the categories in the Polymer app loads noticeably later than the Ripple one, so I think it wins on time-to-interactivity (although I'm not sure how this is or can be defined objectively).

Few disclaimers:

- This is not a like-for-like app - I only implemented the home page and the category pages.
- I haven't tried to replicate the responsive design (just hacked together in a few spare hours). Let me know if you really think this or any other feature would change the comparison results.
- I've followed [Jay Kreps "lazy benchmarking" style](https://engineering.linkedin.com/kafka/benchmarking-apache-kafka-2-million-writes-second-three-cheap-machines), in which I've avoided fine tuning anything for this application. If you look at [index.html](https://github.com/rijs/examples/blob/master/shop/index.html), I've literally just dropped in a couple of script tags, and likewise the [index.js](https://github.com/rijs/examples/blob/master/shop/index.js) is ~10 lines (making Ripple to be as quick for small apps as well suitable for more complicated apps has always been a design goal). There's no build step. The app even starts with babel-node.

Any questions? Feel free to tweet [@pemrouz](https://twitter.com/pemrouz)

### Running

After git clone:

```
cd shop
npm i
npm run start
start http://localhost:4000
```