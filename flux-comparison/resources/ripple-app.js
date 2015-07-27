module.exports = function(){
  var o = once(this)
  o('products-container', 1)
  o('cart-container', 1)
    .attr('data', 'cart')
}



