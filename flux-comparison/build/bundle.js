(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"c:\\Users\\King\\Documents\\rijs\\examples\\flux-comparison\\app.js":[function(require,module,exports){

var resources = ({"resources":({"cart-container":require("./resources\\cart-container.js"),"product-item":require("./resources\\product-item.js"),"products-container":require("./resources\\products-container.js"),"products-list":require("./resources\\products-list.js"),"ripple-app":require("./resources\\ripple-app.js")})}).resources

Object
  .keys(resources)
  .forEach(register)

function register(name) {
  ripple({ 
    name: name
  , body: resources[name]
  })
}

ripple({ 
  name: 'products'
, body: require('./data/products.json')
})

ripple({ 
  name: 'cart'
, body: []
})
},{"./data/products.json":"c:\\Users\\King\\Documents\\rijs\\examples\\flux-comparison\\data\\products.json","./resources\\cart-container.js":"c:\\Users\\King\\Documents\\rijs\\examples\\flux-comparison\\resources\\cart-container.js","./resources\\product-item.js":"c:\\Users\\King\\Documents\\rijs\\examples\\flux-comparison\\resources\\product-item.js","./resources\\products-container.js":"c:\\Users\\King\\Documents\\rijs\\examples\\flux-comparison\\resources\\products-container.js","./resources\\products-list.js":"c:\\Users\\King\\Documents\\rijs\\examples\\flux-comparison\\resources\\products-list.js","./resources\\ripple-app.js":"c:\\Users\\King\\Documents\\rijs\\examples\\flux-comparison\\resources\\ripple-app.js"}],"c:\\Users\\King\\Documents\\rijs\\examples\\flux-comparison\\data\\products.json":[function(require,module,exports){
module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=[
    {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2, "image": "common/assets/ipad-mini.png"},
    {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10, "image": "common/assets/t-shirt.png"},
    {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5, "image": "common/assets/sucker.png"}
]

},{}],"c:\\Users\\King\\Documents\\rijs\\examples\\flux-comparison\\resources\\cart-container.js":[function(require,module,exports){
module.exports = function(cart){
  if (!cart) return;

  var o = once(this)('div.cart.uk-panel.uk-panel-box.uk-panel-box-primary', 1)
  o('div.uk-badge.uk-margin-bottom', 1).text('Your Cart')
  o('div.uk-margin-small-bottom', [nodes(), total()]).html(String)
  o('button.uk-button.uk-button-large.uk-button-success.uk-align-right', 1)
    .on('click', onCheckout)
    .attr('disabled', cart.length ? null : '')
    .text('Checkout')

  function nodes() {
    return cart.length
      ? cart.reduce(unique, []).map(format).join('')
      : '<div>Please add some products to cart.</div>'
  }

  function total() {
    return 'Total: &euro;' + cart.reduce(price, 0).toFixed(2)
  }

  function format(d){
    return '<div>'
         + d.title 
         + '- &euro;' 
         + d.price 
         + ' x '
         + cart.filter(by('id', d.id)).length
         + '</div>'
  }

  function price(p, v){
    return p + v.price
  }

  function onCheckout() {
    console.log('YOU BOUGHT:', cart.map(quantity))
    cart.splice(0)
  }

  function quantity(d){
    return (d.quantity = cart.filter(by('id', d.id)).length), d
  }
}
},{}],"c:\\Users\\King\\Documents\\rijs\\examples\\flux-comparison\\resources\\product-item.js":[function(require,module,exports){
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
},{}],"c:\\Users\\King\\Documents\\rijs\\examples\\flux-comparison\\resources\\products-container.js":[function(require,module,exports){
module.exports = function(products){
  var o = once(this)
  
  o('h2', 1)
    .text('Flux Shup Demo (Ripple)')
    .classed('uk-h2', true)


  o('products-list', 1)
    .attr('data', 'products')
}
},{}],"c:\\Users\\King\\Documents\\rijs\\examples\\flux-comparison\\resources\\products-list.js":[function(require,module,exports){
module.exports = function(products) {
  once(this)
    ('product-item', products)
      .attr('delay', 0)
}
},{}],"c:\\Users\\King\\Documents\\rijs\\examples\\flux-comparison\\resources\\ripple-app.js":[function(require,module,exports){
module.exports = function(){
  var o = once(this)
  o('products-container', 1)
  o('cart-container', 1)
    .attr('data', 'cart')
}




},{}]},{},["c:\\Users\\King\\Documents\\rijs\\examples\\flux-comparison\\app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxBcHBEYXRhXFxSb2FtaW5nXFxucG1cXG5vZGVfbW9kdWxlc1xcd2F0Y2hpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiYXBwLmpzIiwiZGF0YVxccHJvZHVjdHMuanNvbiIsInJlc291cmNlc1xcY2FydC1jb250YWluZXIuanMiLCJyZXNvdXJjZXNcXHByb2R1Y3QtaXRlbS5qcyIsInJlc291cmNlc1xccHJvZHVjdHMtY29udGFpbmVyLmpzIiwicmVzb3VyY2VzXFxwcm9kdWN0cy1saXN0LmpzIiwicmVzb3VyY2VzXFxyaXBwbGUtYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxyXG52YXIgcmVzb3VyY2VzID0gKHtcInJlc291cmNlc1wiOih7XCJjYXJ0LWNvbnRhaW5lclwiOnJlcXVpcmUoXCIuL3Jlc291cmNlc1xcXFxjYXJ0LWNvbnRhaW5lci5qc1wiKSxcInByb2R1Y3QtaXRlbVwiOnJlcXVpcmUoXCIuL3Jlc291cmNlc1xcXFxwcm9kdWN0LWl0ZW0uanNcIiksXCJwcm9kdWN0cy1jb250YWluZXJcIjpyZXF1aXJlKFwiLi9yZXNvdXJjZXNcXFxccHJvZHVjdHMtY29udGFpbmVyLmpzXCIpLFwicHJvZHVjdHMtbGlzdFwiOnJlcXVpcmUoXCIuL3Jlc291cmNlc1xcXFxwcm9kdWN0cy1saXN0LmpzXCIpLFwicmlwcGxlLWFwcFwiOnJlcXVpcmUoXCIuL3Jlc291cmNlc1xcXFxyaXBwbGUtYXBwLmpzXCIpfSl9KS5yZXNvdXJjZXNcclxuXHJcbk9iamVjdFxyXG4gIC5rZXlzKHJlc291cmNlcylcclxuICAuZm9yRWFjaChyZWdpc3RlcilcclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyKG5hbWUpIHtcclxuICByaXBwbGUoeyBcclxuICAgIG5hbWU6IG5hbWVcclxuICAsIGJvZHk6IHJlc291cmNlc1tuYW1lXVxyXG4gIH0pXHJcbn1cclxuXHJcbnJpcHBsZSh7IFxyXG4gIG5hbWU6ICdwcm9kdWN0cydcclxuLCBib2R5OiByZXF1aXJlKCcuL2RhdGEvcHJvZHVjdHMuanNvbicpXHJcbn0pXHJcblxyXG5yaXBwbGUoeyBcclxuICBuYW1lOiAnY2FydCdcclxuLCBib2R5OiBbXVxyXG59KSIsIm1vZHVsZS5leHBvcnRzPW1vZHVsZS5leHBvcnRzPW1vZHVsZS5leHBvcnRzPW1vZHVsZS5leHBvcnRzPW1vZHVsZS5leHBvcnRzPW1vZHVsZS5leHBvcnRzPW1vZHVsZS5leHBvcnRzPW1vZHVsZS5leHBvcnRzPW1vZHVsZS5leHBvcnRzPW1vZHVsZS5leHBvcnRzPW1vZHVsZS5leHBvcnRzPW1vZHVsZS5leHBvcnRzPVtcclxuICAgIHtcImlkXCI6IDEsIFwidGl0bGVcIjogXCJpUGFkIDQgTWluaVwiLCBcInByaWNlXCI6IDUwMC4wMSwgXCJpbnZlbnRvcnlcIjogMiwgXCJpbWFnZVwiOiBcImNvbW1vbi9hc3NldHMvaXBhZC1taW5pLnBuZ1wifSxcclxuICAgIHtcImlkXCI6IDIsIFwidGl0bGVcIjogXCJIJk0gVC1TaGlydCBXaGl0ZVwiLCBcInByaWNlXCI6IDEwLjk5LCBcImludmVudG9yeVwiOiAxMCwgXCJpbWFnZVwiOiBcImNvbW1vbi9hc3NldHMvdC1zaGlydC5wbmdcIn0sXHJcbiAgICB7XCJpZFwiOiAzLCBcInRpdGxlXCI6IFwiQ2hhcmxpIFhDWCAtIFN1Y2tlciBDRFwiLCBcInByaWNlXCI6IDE5Ljk5LCBcImludmVudG9yeVwiOiA1LCBcImltYWdlXCI6IFwiY29tbW9uL2Fzc2V0cy9zdWNrZXIucG5nXCJ9XHJcbl1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjYXJ0KXtcclxuICBpZiAoIWNhcnQpIHJldHVybjtcclxuXHJcbiAgdmFyIG8gPSBvbmNlKHRoaXMpKCdkaXYuY2FydC51ay1wYW5lbC51ay1wYW5lbC1ib3gudWstcGFuZWwtYm94LXByaW1hcnknLCAxKVxyXG4gIG8oJ2Rpdi51ay1iYWRnZS51ay1tYXJnaW4tYm90dG9tJywgMSkudGV4dCgnWW91ciBDYXJ0JylcclxuICBvKCdkaXYudWstbWFyZ2luLXNtYWxsLWJvdHRvbScsIFtub2RlcygpLCB0b3RhbCgpXSkuaHRtbChTdHJpbmcpXHJcbiAgbygnYnV0dG9uLnVrLWJ1dHRvbi51ay1idXR0b24tbGFyZ2UudWstYnV0dG9uLXN1Y2Nlc3MudWstYWxpZ24tcmlnaHQnLCAxKVxyXG4gICAgLm9uKCdjbGljaycsIG9uQ2hlY2tvdXQpXHJcbiAgICAuYXR0cignZGlzYWJsZWQnLCBjYXJ0Lmxlbmd0aCA/IG51bGwgOiAnJylcclxuICAgIC50ZXh0KCdDaGVja291dCcpXHJcblxyXG4gIGZ1bmN0aW9uIG5vZGVzKCkge1xyXG4gICAgcmV0dXJuIGNhcnQubGVuZ3RoXHJcbiAgICAgID8gY2FydC5yZWR1Y2UodW5pcXVlLCBbXSkubWFwKGZvcm1hdCkuam9pbignJylcclxuICAgICAgOiAnPGRpdj5QbGVhc2UgYWRkIHNvbWUgcHJvZHVjdHMgdG8gY2FydC48L2Rpdj4nXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB0b3RhbCgpIHtcclxuICAgIHJldHVybiAnVG90YWw6ICZldXJvOycgKyBjYXJ0LnJlZHVjZShwcmljZSwgMCkudG9GaXhlZCgyKVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZm9ybWF0KGQpe1xyXG4gICAgcmV0dXJuICc8ZGl2PidcclxuICAgICAgICAgKyBkLnRpdGxlIFxyXG4gICAgICAgICArICctICZldXJvOycgXHJcbiAgICAgICAgICsgZC5wcmljZSBcclxuICAgICAgICAgKyAnIHggJ1xyXG4gICAgICAgICArIGNhcnQuZmlsdGVyKGJ5KCdpZCcsIGQuaWQpKS5sZW5ndGhcclxuICAgICAgICAgKyAnPC9kaXY+J1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHJpY2UocCwgdil7XHJcbiAgICByZXR1cm4gcCArIHYucHJpY2VcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG9uQ2hlY2tvdXQoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnWU9VIEJPVUdIVDonLCBjYXJ0Lm1hcChxdWFudGl0eSkpXHJcbiAgICBjYXJ0LnNwbGljZSgwKVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcXVhbnRpdHkoZCl7XHJcbiAgICByZXR1cm4gKGQucXVhbnRpdHkgPSBjYXJ0LmZpbHRlcihieSgnaWQnLCBkLmlkKSkubGVuZ3RoKSwgZFxyXG4gIH1cclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcclxuICB2YXIgaG9zdCA9IHRoaXMuaG9zdFxyXG4gICAgLCBwcm9kdWN0ID0gc2VsKGhvc3QpLmRhdHVtKClcclxuICAgICwgbyA9IG9uY2UodGhpcylcclxuXHJcbiAgaWYgKCFwcm9kdWN0KSByZXR1cm5cclxuXHJcbiAgbygnZGl2JywgMSlcclxuICAgIC5jbGFzc2VkKCd1ay1wYW5lbCB1ay1wYW5lbC1ib3ggdWstbWFyZ2luLWJvdHRvbScsIHRydWUpXHJcblxyXG4gIG8oJ2RpdicpXHJcbiAgICAoJ2ltZycsIDEpXHJcbiAgICAgIC5jbGFzc2VkKCd1ay10aHVtYm5haWwgdWstdGh1bWJuYWlsLW1pbmkgdWstYWxpZ24tbGVmdCcsIHRydWUpXHJcbiAgICAgIC5hdHRyKCdzcmMnLCBwcm9kdWN0LmltYWdlKVxyXG5cclxuICBvKCdkaXYnKVxyXG4gICAgKCdoNCcsIDEpXHJcbiAgICAgIC5jbGFzc2VkKCd1ay1oNCcsIHRydWUpXHJcbiAgICAgIC5odG1sKHByb2R1Y3QudGl0bGUgKyAnIC0gJmV1cm87JyArIHByb2R1Y3QucHJpY2UpXHJcblxyXG4gIG8oJ2RpdicpXHJcbiAgICAoJ2J1dHRvbicsIDEpXHJcbiAgICAgIC5jbGFzc2VkKCd1ay1idXR0b24gdWstYnV0dG9uLXNtYWxsIHVrLWJ1dHRvbi1wcmltYXJ5JywgdHJ1ZSlcclxuICAgICAgLmF0dHIoJ3NyYycsIHByb2R1Y3QuaW1hZ2UpXHJcbiAgICAgIC5hdHRyKCdkaXNhYmxlZCcsIHByb2R1Y3QuaW52ZW50b3J5ID8gbnVsbCA6IDEpXHJcbiAgICAgIC5vbignY2xpY2snLCBhZGRUb0NhcnQpXHJcbiAgICAgIC50ZXh0KHByb2R1Y3QuaW52ZW50b3J5ID8gJ0FkZCB0byBjYXJ0JyA6ICdTb2xkIE91dCcpXHJcblxyXG4gIGZ1bmN0aW9uIGFkZFRvQ2FydChkKXtcclxuICAgIHByb2R1Y3QuaW52ZW50b3J5LS1cclxuICAgIHJpcHBsZSgnY2FydCcpLnB1c2gocHJvZHVjdClcclxuICB9XHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHByb2R1Y3RzKXtcclxuICB2YXIgbyA9IG9uY2UodGhpcylcclxuICBcclxuICBvKCdoMicsIDEpXHJcbiAgICAudGV4dCgnRmx1eCBTaHVwIERlbW8gKFJpcHBsZSknKVxyXG4gICAgLmNsYXNzZWQoJ3VrLWgyJywgdHJ1ZSlcclxuXHJcblxyXG4gIG8oJ3Byb2R1Y3RzLWxpc3QnLCAxKVxyXG4gICAgLmF0dHIoJ2RhdGEnLCAncHJvZHVjdHMnKVxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihwcm9kdWN0cykge1xyXG4gIG9uY2UodGhpcylcclxuICAgICgncHJvZHVjdC1pdGVtJywgcHJvZHVjdHMpXHJcbiAgICAgIC5hdHRyKCdkZWxheScsIDApXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIG8gPSBvbmNlKHRoaXMpXHJcbiAgbygncHJvZHVjdHMtY29udGFpbmVyJywgMSlcclxuICBvKCdjYXJ0LWNvbnRhaW5lcicsIDEpXHJcbiAgICAuYXR0cignZGF0YScsICdjYXJ0JylcclxufVxyXG5cclxuXHJcblxyXG4iXX0=
