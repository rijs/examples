module.exports = class {
  async init(node,state){
    const [emitterify, debounce, values, keys, not, str, is, combine, latest] = await ripple.get('npm', [
      'utilise/emitterify'
    , 'utilise/debounce'
    , 'utilise/values'
    , 'utilise/keys'
    , 'utilise/not'
    , 'utilise/str'
    , 'utilise/is'
    , 'combine'
    , 'latest'
    ])
console.log("emitterify", emitterify)
console.log("debounce", debounce)
    const o = once(node)
        , ROW_HEIGHT = 20
        , offset = emitterify().on('change')//.until(o.on('disconnected'))
        , length = emitterify().on('change')//.until(o.on('disconnected'))
        , trades = state.trades = []
    
    state.deps = { o, str, values, ROW_HEIGHT
    , scroll: debounce((d, i, el) => offset.next(~~(el.scrollTop/ROW_HEIGHT)))
    , resize: debounce((d, i, el) => length.next(~~(el.offsetHeight/ROW_HEIGHT)+1))
    }
    
    // redraw when total number of trades changes
    // this adjusts the scrollbar
    ripple
      .send('trades', 'MAX')
      .map(d => (state.max = d.value.length))
      .map(d => node.draw())
      // .until(o.on('disconnected'))

    // create streams for the window (offset/length) changing
    // and map to trade subscriptions that are in view
    combine({ offset, length })
      .map(extent => ripple.send('trades', 'ACTIVE', extent))
      .pipe(latest)
      .map(d => d.value.map(id => ripple.subscribe('trades', id)))
      .pipe(latest)
      .map(trades => {
        state.trades = trades 
        node.draw()
      })

    offset.next(state.offset = 0)
    length.next(state.length = 11)
  }

  async render(node, { max, trades = [], deps }){
    const { o, str, values, scroll, resize, ROW_HEIGHT } = deps

    o.on('scroll.window', scroll)
     .on('resize.window', resize)
     
    o('.loading', !trades.length)
      .text('Loading...')

    o('.container', trades.length)
      .attr('style', `height: ${max*ROW_HEIGHT}px`)
      ('.row', trades)
        .attr('index', d => ''+d.index)
        .attr('id', d => d.id)
        .attr('style', (d, i) => `
          height: ${ROW_HEIGHT}px;
          top: ${d.index*ROW_HEIGHT}px;
        `)
        ('span.cell', values)
          .attr('class', (d, i) => `cell cell${i%11}`)
          .text(str)
  }
}