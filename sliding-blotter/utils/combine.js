const emitterify = require('utilise/emitterify')
    , is         = require('utilise/is')
    
// TODO: factor out
module.exports = streams => {
  const output = emitterify().on('merged')
      , values = Object.values(streams)
      , keys = Object.keys(streams)
  
  keys
    .map(key => streams[key]
      .map(d => (streams[key].value = d))
      .filter(d => values.every($ => ('value' in $)))
      .map(d => output.next(
        values.reduce(
          (p, v, i) => (p[keys[i]] = values[i].value, p)
        , is.arr(streams) ? [] : {}
        )
      ))
      .until(output.once('stop'))
      // .start(output.once('start')) - TODO: analogous api for start?
    )

  Promise
    .all(values.map(d => d.once('stop')))
    .then(() => output.source.emit('stop'))

  output
    .once('start')
    .map(d => streams.map($ => $.source.emit('start')))

  return output
}