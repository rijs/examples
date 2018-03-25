module.exports = input => {
  let latest = []
    , values = []
    , output = input.each(streams => {
        (streams.next ? [streams] : streams) 
          .map(($, i) => $
            .each(value => {
              values[i] = value
              output.next(streams.next ? values[i] : values)
            })
            .source
            .emit('start')
          )

        latest
          .map(($, i) => $.source.emit('stop'))

        latest = streams.next ? [streams] : streams
      })

  input
    .source
    .once('stop')
    .each(d => {
      console.log('lstop')
      latest.map($ => $.source.emit('stop'))
    })

  return output 
}