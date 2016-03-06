export default function item(d, i){
  const complete = el => d => update(i-1+'.completed', el.checked)(ripple('items'))
      , destroy = el => d => remove(i-1)(ripple('items'))
      , o = once(this)

  o('input', 1)
    .property('checked', d.completed)
    .on('click.complete', th(complete))
    .attr('type', 'checkbox')

  o('label', 1)
    .text(d.item)

  o('button.destroy', 1) 
    .on('click.destroy', th(destroy))
}