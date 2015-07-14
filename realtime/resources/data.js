var start = performance.now()

// for (var i = 0; i < 100; i++)
//   for (var j = 0; j < 100; j++) {
//     !prices[i] && (prices[i] = [])
//     prices[i][j] = []
//     // ripple(
//     //   '/prices/'+i+'/'+j
//     // , prices[i][j]
//     // )
//   }

// ripple('prices', d3.range(100).map(array))

ripple('/prices/{i}/{j}', d3.range(100).map(array), { get: get, set: set })

function get(params, body) {
  return body[params.i][params.j]
}

function set(params, body, val) {
  return body[params.i][params.j] = val
}

console.log('registration', performance.now() - start)