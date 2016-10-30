# The Cost of Loading 10,000 modules

This is just a quick back-of-the-envelope calculation [prompted by this Twitter discussion](https://twitter.com/cramforce/status/792043099908300802) to get an idea of the scalability of loading lots of modules by contrasting Google's/Polymer's approach (HTML Imports over HTTP/2) vs [Ripple](https://github.com/rijs/fullstack/#ripple) (WS).

This is particularly important because the dominant approach in the JS world is still to pointlessly bundle apps (structured around routes) and most people largely believe HTTP/2 will solve all the world's problems. However:

* [HTTP/2 benefits in the real world are questionable](http://engineering.khanacademy.org/posts/js-packaging-http2.htm) ("Performance got worse")
* Bundling has a huge cognitive/time overhead 
* Bundling will always be inefficient

With Ripple, a developer just authors components. The [concerns of efficient delivery of components are separated out](https://github.com/rijs/backpressure#ripple--backpressure) and eliminated from the developer altogether. There are no bundles to create. If you refactor a component, there's nothing else to update, which greatly improves DX and developer productivity. There is also never any over or under fetching: only the exact components on the page are loaded/cached, which greatly improves UX. Moreover, this approach works on older browsers as opposed to just the latest version of Chrome.

| Modules | HTML Imports (ms) | WS (ms) |
| ---: | ---: | ---: |
| `100` | `29798.375` | `8883.545` |
| `1000` | `48361.215` | `10761.715` |
| `10000` | failed to complete after 1 hour, crashed Chrome | `28361.325` |

![image](https://cloud.githubusercontent.com/assets/2184177/19833753/7abc125c-9e3d-11e6-9e06-f71f179f12a2.png)

#### Notes:

* This is [lazy benchmarking](https://engineering.linkedin.com/kafka/benchmarking-apache-kafka-2-million-writes-second-three-cheap-machines). I just did `npm i rijs/fullstack` and wrote the [most basic server with zero-config](https://github.com/rijs/examples/blob/master/10000-modules/ws/index.js).

* The only tweak I made was to remove the `console.log` in the `log` function of the development version of the client `/node_modules/rijs.serve/dist/ripple.js`. This should not be in `ripple.min.js` (production version) anyway and will be fixed in next release. 

* I have not yet made any optimisatioons for this use case.

* I'm currently exploring a new module to synchronise Ripple nodes across multiple servers and as a result, this performance here should also greatly improve. The backpressure module will be more intelligent about micro-batching. As [Jay Kreps said](https://twitter.com/jaykreps/status/753985884769226752), there is absolutely no reason why batching should be forced upon developers to deal with when it's far more efficient to handle it under the covers.

* If you compare it took `29798.375ms` for 100 HTML Imports vs `28361.325` for 10,000 resources with Ripple that's `x100` difference.

* If you do `(48361.215 - 29798.375) / 900`, `(10761.715 - 8883.545) / 900` and `(28361.325 - 10761.715) / 9000` you will see that Ripple consistently takes `~2ms` per module, whilst HTML Imports initially takes `~20ms (x10)` per module for the first 1000 - which rapidly increases as it is never able to load 10,000 modules.

* HTML Imports performance was worse with HTTP/2:

![image](https://cloud.githubusercontent.com/assets/2184177/19833757/ae64db98-9e3d-11e6-9f29-422bc423aeaa.png)

There is a small script `./gen` in each folder to generate `10,000` HTML imports or resources. The number is also configurable with `-t, --total`.

To run, cd into each directory, `npm i`, then `start http://localhost:(2000|3000)`