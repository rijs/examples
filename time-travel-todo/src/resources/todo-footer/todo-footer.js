export default function footer({ items, filter }){
  const toggle      = d => update('current', d)(filter)
      , clear       = d => ripple('items', items.filter(by('completed', false)))
      , uncompleted = items.filter(by('completed', false))
      , completed   = items.filter(by('completed', true))
      , o           = once(this)

  o('span.counter', 1)
    .text(uncompleted.length + ' item'+(~-(uncompleted.length) ? 's' : '')+' left')

  o('button.filter', ['All', 'Active', 'Completed'])
    .on('click.filter', toggle)
    .classed('selected', is(filter.current))
    .text(String)

  o('a.clear', !completed.length)
    .text('Clear Completed ('+completed.length+')')
    .on('click.clear', clear)
}