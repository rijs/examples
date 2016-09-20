export default {
  name: 'shop-home'
, body: home
, headers: { needs: '[css][data=categories]' }
}

function home(node, { categories }){
  const o = once(node)
    ('.category', values(categories))
  
  o('.blur-img', 1)
    .attr('style', d => d.blurred)

  o('img', 1)
    .attr('src', '')
    .attr('src', d => d.image)
    .on('load', (d, i, el) => o(el).attr('style', 'opacity: 1'))

  o('img', 1)
    .attr('src', d => d.image)

  o('label', 1)
    .text(d => d.label)

  o('button', 1)
    .text('SHOP NOW')
    .on('click.shop', d => go(d.url))
}