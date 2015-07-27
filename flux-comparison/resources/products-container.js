module.exports = function(products){
  var o = once(this)
  
  o('h2', 1)
    .text('Flux Shup Demo (Ripple)')
    .classed('uk-h2', true)


  o('products-list', 1)
    .attr('data', 'products')
}