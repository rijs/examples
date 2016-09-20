export default function app(node, { categories, routes }){
  const o = window.app = once(node)
      , list = values(categories) 
      , { url, params } = router(routes.routes)
      , { category } = params

  o('a.title', 1)
    .attr('href', '/')
    .text('SHOP')

  o('icon-cart', 1)

  o('nav', 1)
    ('a', list)
      .classed('is-active', d => d.id == category)
      .attr('href', d => d.url)
      .text(d => d.label)

  o('shop-home'    , url == '/')
  o('shop-category', category && { categories, category })
}