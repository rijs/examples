module.exports = function(){
  var host = this.host
    , product = sel(host).datum()
    , o = once(this)

  if (!product) return

  o('div', 1)
    .classed('uk-panel uk-panel-box uk-margin-bottom', true)

  o('div')
    ('img', 1)
      .classed('uk-thumbnail uk-thumbnail-mini uk-align-left', true)
      .attr('src', product.image)

  o('div')
    ('h4', 1)
      .classed('uk-h4', true)
      .html(product.title + ' - &euro;' + product.price)

  o('div')
    ('button', 1)
      .classed('uk-button uk-button-small uk-button-primary', true)
      .attr('src', product.image)
      .attr('disabled', product.inventory ? null : 1)
      .on('click', addToCart)
      .text(product.inventory ? 'Add to cart' : 'Sold Out')

  function addToCart(d){
    product.inventory--
    ripple('cart').push(product)
  }
}