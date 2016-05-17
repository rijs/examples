export default function item(d, i){
  if ('key' in d && d.key != --i) return
  
  const complete = el => d => update(i+'.completed', el.checked)(ripple('items'))
      , destroy = el => d => remove(i)(ripple('items'))
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