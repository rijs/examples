export default function(node, state){
  if (!includes(state.category)(attr('data')(node))) 
    return log('pulling', node.draw(attr('data', state.category)(node)))

  const o = once(node)
      , { categories, category } = state
      , items = state[category]
      
  o('.blur-img', 1)
    .attr('style', categories[category].blurred)

  o('img', 1)
    .attr('src', "")
    .attr('src', categories[category].image)
    .on('load', (d, i, el) => o(el).attr('style', 'opacity: 1'))

  o('h1', 1)
    .text(categories[category].label)

  o('.count', 1)
    .text(`(${items.length} items)`)

  const i = o('.item', items)

  i('img', 1, d => d.image, ':first-child')
    .attr('src', d => d.image)
    .on('load', (d, i, el) => o(el).attr('style', 'opacity: 1'))

  i('.title', 1)
    .text(d => d.title)
  
  i('.price', 1)
    .text(d => d.price.toFixed(2))


}