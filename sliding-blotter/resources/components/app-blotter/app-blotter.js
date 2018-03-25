const emitterify = require('utilise/emitterify')
    , debounce = require('utilise/debounce')
    , values = require('utilise/values')
    , once = require('utilise/once')
    , str = require('utilise/str')
    , combine = require('combine')
    , latest = require('latest')
    , style = require('@compone/style')
    , ROW_HEIGHT = 20
    
module.exports = class {
  async connected(node, state){
    await style(node, await ripple.get('app-blotter.css'))

    const o = once(node)
        , offset = emitterify().on('change').until(node.once('disconnected'))
        , length = emitterify().on('change').until(node.once('disconnected'))
        , trades = state.trades = []

    // redraw when total number of trades changes
    // this adjusts the scrollbar
    ripple
      .send('trades', 'MAX')
      .map(d => (state.max = d.value.length))
      .map(d => node.render())
      .until(node.once('disconnected'))

    // create streams for the window (offset/length) changing
    // and map to trade subscriptions that are in view
    combine({ offset, length })
      .map(extent => ripple.send('trades', 'ACTIVE', extent))
      .pipe(latest)
      .map(d => ripple.subscribe('trades', d.value))
      .pipe(latest)
      .map(trades => (state.trades = values(trades)))
      .each(() => node.render())

    offset.next(0)
    length.next(11)

    node
      .on('scroll.window', debounce(({ target }) => offset.next(~~(target.scrollTop/ROW_HEIGHT))))
      .on('resize.window', debounce(({ target }) => length.next(~~(target.offsetHeight/ROW_HEIGHT)+1)))
  }

  async render(node, { max, trades = [], deps }){
    const o = once(node)
    
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