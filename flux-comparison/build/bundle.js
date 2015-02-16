(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"c:\\Users\\King\\Documents\\ripple-examples\\flux-comparison\\app.js":[function(require,module,exports){

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
},{"./data/products.json":"c:\\Users\\King\\Documents\\ripple-examples\\flux-comparison\\data\\products.json","./resources\\cart-container.js":"c:\\Users\\King\\Documents\\ripple-examples\\flux-comparison\\resources\\cart-container.js","./resources\\product-item.js":"c:\\Users\\King\\Documents\\ripple-examples\\flux-comparison\\resources\\product-item.js","./resources\\products-container.js":"c:\\Users\\King\\Documents\\ripple-examples\\flux-comparison\\resources\\products-container.js","./resources\\products-list.js":"c:\\Users\\King\\Documents\\ripple-examples\\flux-comparison\\resources\\products-list.js","./resources\\ripple-app.js":"c:\\Users\\King\\Documents\\ripple-examples\\flux-comparison\\resources\\ripple-app.js"}],"c:\\Users\\King\\Documents\\ripple-examples\\flux-comparison\\data\\products.json":[function(require,module,exports){
module.exports=module.exports=[
    {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2, "image": "common/assets/ipad-mini.png"},
    {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10, "image": "common/assets/t-shirt.png"},
    {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5, "image": "common/assets/sucker.png"}
]

},{}],"c:\\Users\\King\\Documents\\ripple-examples\\flux-comparison\\resources\\cart-container.js":[function(require,module,exports){
module.exports = function(cart){
  var self = once(this, 'div.cart.uk-panel.uk-panel-box.uk-panel-box-primary')
    once(self, 'div.uk-badge.uk-margin-bottom').text('Your Cart')
    once(self, 'div.uk-margin-small-bottom', [nodes(), total()]).html(String)
    once(self, 'button.uk-button.uk-button-large.uk-button-success.uk-align-right')
      .on('click', onCheckout)
      .attr('disabled', cart.length ? null : '')
      .text('Checkout')

  function nodes() {
    return cart.length
      ? cart.filter(unique('id')).map(format).join('')
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
},{}],"c:\\Users\\King\\Documents\\ripple-examples\\flux-comparison\\resources\\product-item.js":[function(require,module,exports){
module.exports = function(){
  var host = this.host
    , product = sel(host).datum()

  if (!product) return

  var self = once(this, 'div')
        .classed('uk-panel uk-panel-box uk-margin-bottom', true)

  once(self, 'img')
    .classed('uk-thumbnail uk-thumbnail-mini uk-align-left', true)
    .attr('src', product.image)

  once(self, 'h4')
    .classed('uk-h4', true)
    .html(product.title + ' - &euro;' + product.price)

  once(self, 'button')
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
},{}],"c:\\Users\\King\\Documents\\ripple-examples\\flux-comparison\\resources\\products-container.js":[function(require,module,exports){
module.exports = function(products){
  once(this, 'h2')
    .text('Flux Shup Demo (Ripple)')
    .classed('uk-h2', true)

  once(this, 'products-list').attr('data', 'products')
}
},{}],"c:\\Users\\King\\Documents\\ripple-examples\\flux-comparison\\resources\\products-list.js":[function(require,module,exports){
module.exports = function(products) {
  once(this, 'product-item', products).attr('delay', 0)
}
},{}],"c:\\Users\\King\\Documents\\ripple-examples\\flux-comparison\\resources\\ripple-app.js":[function(require,module,exports){
module.exports = function(){
  once(this, 'products-container')
  once(this, 'cart-container').attr('data', 'cart')
}




},{}]},{},["c:\\Users\\King\\Documents\\ripple-examples\\flux-comparison\\app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXEFwcERhdGFcXFJvYW1pbmdcXG5wbVxcbm9kZV9tb2R1bGVzXFx3YXRjaGlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJhcHAuanMiLCJkYXRhXFxwcm9kdWN0cy5qc29uIiwicmVzb3VyY2VzXFxjYXJ0LWNvbnRhaW5lci5qcyIsInJlc291cmNlc1xccHJvZHVjdC1pdGVtLmpzIiwicmVzb3VyY2VzXFxwcm9kdWN0cy1jb250YWluZXIuanMiLCJyZXNvdXJjZXNcXHByb2R1Y3RzLWxpc3QuanMiLCJyZXNvdXJjZXNcXHJpcHBsZS1hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxudmFyIHJlc291cmNlcyA9ICh7XCJyZXNvdXJjZXNcIjooe1wiY2FydC1jb250YWluZXJcIjpyZXF1aXJlKFwiLi9yZXNvdXJjZXNcXFxcY2FydC1jb250YWluZXIuanNcIiksXCJwcm9kdWN0LWl0ZW1cIjpyZXF1aXJlKFwiLi9yZXNvdXJjZXNcXFxccHJvZHVjdC1pdGVtLmpzXCIpLFwicHJvZHVjdHMtY29udGFpbmVyXCI6cmVxdWlyZShcIi4vcmVzb3VyY2VzXFxcXHByb2R1Y3RzLWNvbnRhaW5lci5qc1wiKSxcInByb2R1Y3RzLWxpc3RcIjpyZXF1aXJlKFwiLi9yZXNvdXJjZXNcXFxccHJvZHVjdHMtbGlzdC5qc1wiKSxcInJpcHBsZS1hcHBcIjpyZXF1aXJlKFwiLi9yZXNvdXJjZXNcXFxccmlwcGxlLWFwcC5qc1wiKX0pfSkucmVzb3VyY2VzXHJcblxyXG5PYmplY3RcclxuICAua2V5cyhyZXNvdXJjZXMpXHJcbiAgLmZvckVhY2gocmVnaXN0ZXIpXHJcblxyXG5mdW5jdGlvbiByZWdpc3RlcihuYW1lKSB7XHJcbiAgcmlwcGxlKHsgXHJcbiAgICBuYW1lOiBuYW1lXHJcbiAgLCBib2R5OiByZXNvdXJjZXNbbmFtZV1cclxuICB9KVxyXG59XHJcblxyXG5yaXBwbGUoeyBcclxuICBuYW1lOiAncHJvZHVjdHMnXHJcbiwgYm9keTogcmVxdWlyZSgnLi9kYXRhL3Byb2R1Y3RzLmpzb24nKVxyXG59KVxyXG5cclxucmlwcGxlKHsgXHJcbiAgbmFtZTogJ2NhcnQnXHJcbiwgYm9keTogW11cclxufSkiLCJtb2R1bGUuZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz1bXHJcbiAgICB7XCJpZFwiOiAxLCBcInRpdGxlXCI6IFwiaVBhZCA0IE1pbmlcIiwgXCJwcmljZVwiOiA1MDAuMDEsIFwiaW52ZW50b3J5XCI6IDIsIFwiaW1hZ2VcIjogXCJjb21tb24vYXNzZXRzL2lwYWQtbWluaS5wbmdcIn0sXHJcbiAgICB7XCJpZFwiOiAyLCBcInRpdGxlXCI6IFwiSCZNIFQtU2hpcnQgV2hpdGVcIiwgXCJwcmljZVwiOiAxMC45OSwgXCJpbnZlbnRvcnlcIjogMTAsIFwiaW1hZ2VcIjogXCJjb21tb24vYXNzZXRzL3Qtc2hpcnQucG5nXCJ9LFxyXG4gICAge1wiaWRcIjogMywgXCJ0aXRsZVwiOiBcIkNoYXJsaSBYQ1ggLSBTdWNrZXIgQ0RcIiwgXCJwcmljZVwiOiAxOS45OSwgXCJpbnZlbnRvcnlcIjogNSwgXCJpbWFnZVwiOiBcImNvbW1vbi9hc3NldHMvc3Vja2VyLnBuZ1wifVxyXG5dXHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY2FydCl7XHJcbiAgdmFyIHNlbGYgPSBvbmNlKHRoaXMsICdkaXYuY2FydC51ay1wYW5lbC51ay1wYW5lbC1ib3gudWstcGFuZWwtYm94LXByaW1hcnknKVxyXG4gICAgb25jZShzZWxmLCAnZGl2LnVrLWJhZGdlLnVrLW1hcmdpbi1ib3R0b20nKS50ZXh0KCdZb3VyIENhcnQnKVxyXG4gICAgb25jZShzZWxmLCAnZGl2LnVrLW1hcmdpbi1zbWFsbC1ib3R0b20nLCBbbm9kZXMoKSwgdG90YWwoKV0pLmh0bWwoU3RyaW5nKVxyXG4gICAgb25jZShzZWxmLCAnYnV0dG9uLnVrLWJ1dHRvbi51ay1idXR0b24tbGFyZ2UudWstYnV0dG9uLXN1Y2Nlc3MudWstYWxpZ24tcmlnaHQnKVxyXG4gICAgICAub24oJ2NsaWNrJywgb25DaGVja291dClcclxuICAgICAgLmF0dHIoJ2Rpc2FibGVkJywgY2FydC5sZW5ndGggPyBudWxsIDogJycpXHJcbiAgICAgIC50ZXh0KCdDaGVja291dCcpXHJcblxyXG4gIGZ1bmN0aW9uIG5vZGVzKCkge1xyXG4gICAgcmV0dXJuIGNhcnQubGVuZ3RoXHJcbiAgICAgID8gY2FydC5maWx0ZXIodW5pcXVlKCdpZCcpKS5tYXAoZm9ybWF0KS5qb2luKCcnKVxyXG4gICAgICA6ICc8ZGl2PlBsZWFzZSBhZGQgc29tZSBwcm9kdWN0cyB0byBjYXJ0LjwvZGl2PidcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHRvdGFsKCkge1xyXG4gICAgcmV0dXJuICdUb3RhbDogJmV1cm87JyArIGNhcnQucmVkdWNlKHByaWNlLCAwKS50b0ZpeGVkKDIpXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmb3JtYXQoZCl7XHJcbiAgICByZXR1cm4gJzxkaXY+J1xyXG4gICAgICAgICArIGQudGl0bGUgXHJcbiAgICAgICAgICsgJy0gJmV1cm87JyBcclxuICAgICAgICAgKyBkLnByaWNlIFxyXG4gICAgICAgICArICcgeCAnXHJcbiAgICAgICAgICsgY2FydC5maWx0ZXIoYnkoJ2lkJywgZC5pZCkpLmxlbmd0aFxyXG4gICAgICAgICArICc8L2Rpdj4nXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwcmljZShwLCB2KXtcclxuICAgIHJldHVybiBwICsgdi5wcmljZVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb25DaGVja291dCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdZT1UgQk9VR0hUOicsIGNhcnQubWFwKHF1YW50aXR5KSlcclxuICAgIGNhcnQuc3BsaWNlKDApXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBxdWFudGl0eShkKXtcclxuICAgIHJldHVybiAoZC5xdWFudGl0eSA9IGNhcnQuZmlsdGVyKGJ5KCdpZCcsIGQuaWQpKS5sZW5ndGgpLCBkXHJcbiAgfVxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBob3N0ID0gdGhpcy5ob3N0XHJcbiAgICAsIHByb2R1Y3QgPSBzZWwoaG9zdCkuZGF0dW0oKVxyXG5cclxuICBpZiAoIXByb2R1Y3QpIHJldHVyblxyXG5cclxuICB2YXIgc2VsZiA9IG9uY2UodGhpcywgJ2RpdicpXHJcbiAgICAgICAgLmNsYXNzZWQoJ3VrLXBhbmVsIHVrLXBhbmVsLWJveCB1ay1tYXJnaW4tYm90dG9tJywgdHJ1ZSlcclxuXHJcbiAgb25jZShzZWxmLCAnaW1nJylcclxuICAgIC5jbGFzc2VkKCd1ay10aHVtYm5haWwgdWstdGh1bWJuYWlsLW1pbmkgdWstYWxpZ24tbGVmdCcsIHRydWUpXHJcbiAgICAuYXR0cignc3JjJywgcHJvZHVjdC5pbWFnZSlcclxuXHJcbiAgb25jZShzZWxmLCAnaDQnKVxyXG4gICAgLmNsYXNzZWQoJ3VrLWg0JywgdHJ1ZSlcclxuICAgIC5odG1sKHByb2R1Y3QudGl0bGUgKyAnIC0gJmV1cm87JyArIHByb2R1Y3QucHJpY2UpXHJcblxyXG4gIG9uY2Uoc2VsZiwgJ2J1dHRvbicpXHJcbiAgICAuY2xhc3NlZCgndWstYnV0dG9uIHVrLWJ1dHRvbi1zbWFsbCB1ay1idXR0b24tcHJpbWFyeScsIHRydWUpXHJcbiAgICAuYXR0cignc3JjJywgcHJvZHVjdC5pbWFnZSlcclxuICAgIC5hdHRyKCdkaXNhYmxlZCcsIHByb2R1Y3QuaW52ZW50b3J5ID8gbnVsbCA6IDEpXHJcbiAgICAub24oJ2NsaWNrJywgYWRkVG9DYXJ0KVxyXG4gICAgLnRleHQocHJvZHVjdC5pbnZlbnRvcnkgPyAnQWRkIHRvIGNhcnQnIDogJ1NvbGQgT3V0JylcclxuXHJcbiAgZnVuY3Rpb24gYWRkVG9DYXJ0KGQpe1xyXG4gICAgcHJvZHVjdC5pbnZlbnRvcnktLVxyXG4gICAgcmlwcGxlKCdjYXJ0JykucHVzaChwcm9kdWN0KVxyXG4gIH1cclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocHJvZHVjdHMpe1xyXG4gIG9uY2UodGhpcywgJ2gyJylcclxuICAgIC50ZXh0KCdGbHV4IFNodXAgRGVtbyAoUmlwcGxlKScpXHJcbiAgICAuY2xhc3NlZCgndWstaDInLCB0cnVlKVxyXG5cclxuICBvbmNlKHRoaXMsICdwcm9kdWN0cy1saXN0JykuYXR0cignZGF0YScsICdwcm9kdWN0cycpXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHByb2R1Y3RzKSB7XHJcbiAgb25jZSh0aGlzLCAncHJvZHVjdC1pdGVtJywgcHJvZHVjdHMpLmF0dHIoJ2RlbGF5JywgMClcclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcclxuICBvbmNlKHRoaXMsICdwcm9kdWN0cy1jb250YWluZXInKVxyXG4gIG9uY2UodGhpcywgJ2NhcnQtY29udGFpbmVyJykuYXR0cignZGF0YScsICdjYXJ0JylcclxufVxyXG5cclxuXHJcblxyXG4iXX0=
