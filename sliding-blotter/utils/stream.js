const { emitterify, values, az, keys, extend, str } = require('utilise/pure')

// this will create a stream that will output the state of the world 
// when subscribed then stream the individual changes 
const stream = (input, { destroy = true, id  } = {}) => emitterify(input)
  .on('value')
  .on('start', function(){
    this.next({ type: 'update', value: input })

    input
      .on('change')
      .map(this.next)
      .until(this.once('stop'))

    this
      .once('stop')
      .filter(d => destroy)
      .map(d => input.emit('stop'))
  })
  .unpromise()

// this will create a new sorted view from an object
// note that these transforms do not currently make any attempt to be efficient
// since we have a stream of deltas, this can be achieved with zero invalidation
const saz = predicate => input => {
  const output = emitterify(values(input).sort(az(predicate)))
  input
    .on('change')
    .map(change => {
      keys(output).map(k => { delete output[k] })
      extend(output)(values(input).sort(az(predicate)))
      output.emit('change', { type: 'update', value: output })
  })
  return output
}

// arbitrary transform
const transform = (fn = d => d) => (input = {}) => {
  let output = emitterify(fn(input))
    , last

  input
    .on('change')
    .map(() => fn(input))
    .filter(updated => {
      const latest = str(updated)
      return latest == last 
        ? false
        : (last = latest, true)
    })
    .map(updated => {
      // console.log(" updated",   updated)
      keys(output).map(k => { delete output[k] })
      extend(output)(updated)
      output.emit('change', { type: 'update', value: output })
    })
    .until(output.once('stop')
      .map(d => input.emit('stop'))
    )

  return output
}

module.exports = {
  stream
, az: saz
, transform
}