module.exports = streams => {
  const emitterify = require('utilise/emitterify')
      , keys       = require('utilise/keys')
      , is         = require('utilise/is')
      , output     = emitterify().on('change')
      , values     = {}

  keys(streams)
    .map(stream => streams[stream]
      .map(d => values[stream] = d)
      .filter(d => keys(streams).every(is.in(values)))
      .map(d => output.next(values))
    )

  return output
}