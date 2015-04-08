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
module.exports=[
    {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2, "image": "common/assets/ipad-mini.png"},
    {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10, "image": "common/assets/t-shirt.png"},
    {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5, "image": "common/assets/sucker.png"}
]

},{}],"c:\\Users\\King\\Documents\\ripple-examples\\flux-comparison\\resources\\cart-container.js":[function(require,module,exports){
module.exports = function(cart){
  if (!cart) return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXEFwcERhdGFcXFJvYW1pbmdcXG5wbVxcbm9kZV9tb2R1bGVzXFx3YXRjaGlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJhcHAuanMiLCJkYXRhXFxwcm9kdWN0cy5qc29uIiwicmVzb3VyY2VzXFxjYXJ0LWNvbnRhaW5lci5qcyIsInJlc291cmNlc1xccHJvZHVjdC1pdGVtLmpzIiwicmVzb3VyY2VzXFxwcm9kdWN0cy1jb250YWluZXIuanMiLCJyZXNvdXJjZXNcXHByb2R1Y3RzLWxpc3QuanMiLCJyZXNvdXJjZXNcXHJpcHBsZS1hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxyXG52YXIgcmVzb3VyY2VzID0gKHtcInJlc291cmNlc1wiOih7XCJjYXJ0LWNvbnRhaW5lclwiOnJlcXVpcmUoXCIuL3Jlc291cmNlc1xcXFxjYXJ0LWNvbnRhaW5lci5qc1wiKSxcInByb2R1Y3QtaXRlbVwiOnJlcXVpcmUoXCIuL3Jlc291cmNlc1xcXFxwcm9kdWN0LWl0ZW0uanNcIiksXCJwcm9kdWN0cy1jb250YWluZXJcIjpyZXF1aXJlKFwiLi9yZXNvdXJjZXNcXFxccHJvZHVjdHMtY29udGFpbmVyLmpzXCIpLFwicHJvZHVjdHMtbGlzdFwiOnJlcXVpcmUoXCIuL3Jlc291cmNlc1xcXFxwcm9kdWN0cy1saXN0LmpzXCIpLFwicmlwcGxlLWFwcFwiOnJlcXVpcmUoXCIuL3Jlc291cmNlc1xcXFxyaXBwbGUtYXBwLmpzXCIpfSl9KS5yZXNvdXJjZXNcclxuXHJcbk9iamVjdFxyXG4gIC5rZXlzKHJlc291cmNlcylcclxuICAuZm9yRWFjaChyZWdpc3RlcilcclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyKG5hbWUpIHtcclxuICByaXBwbGUoeyBcclxuICAgIG5hbWU6IG5hbWVcclxuICAsIGJvZHk6IHJlc291cmNlc1tuYW1lXVxyXG4gIH0pXHJcbn1cclxuXHJcbnJpcHBsZSh7IFxyXG4gIG5hbWU6ICdwcm9kdWN0cydcclxuLCBib2R5OiByZXF1aXJlKCcuL2RhdGEvcHJvZHVjdHMuanNvbicpXHJcbn0pXHJcblxyXG5yaXBwbGUoeyBcclxuICBuYW1lOiAnY2FydCdcclxuLCBib2R5OiBbXVxyXG59KSIsIm1vZHVsZS5leHBvcnRzPVtcclxuICAgIHtcImlkXCI6IDEsIFwidGl0bGVcIjogXCJpUGFkIDQgTWluaVwiLCBcInByaWNlXCI6IDUwMC4wMSwgXCJpbnZlbnRvcnlcIjogMiwgXCJpbWFnZVwiOiBcImNvbW1vbi9hc3NldHMvaXBhZC1taW5pLnBuZ1wifSxcclxuICAgIHtcImlkXCI6IDIsIFwidGl0bGVcIjogXCJIJk0gVC1TaGlydCBXaGl0ZVwiLCBcInByaWNlXCI6IDEwLjk5LCBcImludmVudG9yeVwiOiAxMCwgXCJpbWFnZVwiOiBcImNvbW1vbi9hc3NldHMvdC1zaGlydC5wbmdcIn0sXHJcbiAgICB7XCJpZFwiOiAzLCBcInRpdGxlXCI6IFwiQ2hhcmxpIFhDWCAtIFN1Y2tlciBDRFwiLCBcInByaWNlXCI6IDE5Ljk5LCBcImludmVudG9yeVwiOiA1LCBcImltYWdlXCI6IFwiY29tbW9uL2Fzc2V0cy9zdWNrZXIucG5nXCJ9XHJcbl1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjYXJ0KXtcclxuICBpZiAoIWNhcnQpIHJldHVybjtcclxuICB2YXIgc2VsZiA9IG9uY2UodGhpcywgJ2Rpdi5jYXJ0LnVrLXBhbmVsLnVrLXBhbmVsLWJveC51ay1wYW5lbC1ib3gtcHJpbWFyeScpXHJcbiAgICBvbmNlKHNlbGYsICdkaXYudWstYmFkZ2UudWstbWFyZ2luLWJvdHRvbScpLnRleHQoJ1lvdXIgQ2FydCcpXHJcbiAgICBvbmNlKHNlbGYsICdkaXYudWstbWFyZ2luLXNtYWxsLWJvdHRvbScsIFtub2RlcygpLCB0b3RhbCgpXSkuaHRtbChTdHJpbmcpXHJcbiAgICBvbmNlKHNlbGYsICdidXR0b24udWstYnV0dG9uLnVrLWJ1dHRvbi1sYXJnZS51ay1idXR0b24tc3VjY2Vzcy51ay1hbGlnbi1yaWdodCcpXHJcbiAgICAgIC5vbignY2xpY2snLCBvbkNoZWNrb3V0KVxyXG4gICAgICAuYXR0cignZGlzYWJsZWQnLCBjYXJ0Lmxlbmd0aCA/IG51bGwgOiAnJylcclxuICAgICAgLnRleHQoJ0NoZWNrb3V0JylcclxuXHJcbiAgZnVuY3Rpb24gbm9kZXMoKSB7XHJcbiAgICByZXR1cm4gY2FydC5sZW5ndGhcclxuICAgICAgPyBjYXJ0LmZpbHRlcih1bmlxdWUoJ2lkJykpLm1hcChmb3JtYXQpLmpvaW4oJycpXHJcbiAgICAgIDogJzxkaXY+UGxlYXNlIGFkZCBzb21lIHByb2R1Y3RzIHRvIGNhcnQuPC9kaXY+J1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdG90YWwoKSB7XHJcbiAgICByZXR1cm4gJ1RvdGFsOiAmZXVybzsnICsgY2FydC5yZWR1Y2UocHJpY2UsIDApLnRvRml4ZWQoMilcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGZvcm1hdChkKXtcclxuICAgIHJldHVybiAnPGRpdj4nXHJcbiAgICAgICAgICsgZC50aXRsZSBcclxuICAgICAgICAgKyAnLSAmZXVybzsnIFxyXG4gICAgICAgICArIGQucHJpY2UgXHJcbiAgICAgICAgICsgJyB4ICdcclxuICAgICAgICAgKyBjYXJ0LmZpbHRlcihieSgnaWQnLCBkLmlkKSkubGVuZ3RoXHJcbiAgICAgICAgICsgJzwvZGl2PidcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHByaWNlKHAsIHYpe1xyXG4gICAgcmV0dXJuIHAgKyB2LnByaWNlXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBvbkNoZWNrb3V0KCkge1xyXG4gICAgY29uc29sZS5sb2coJ1lPVSBCT1VHSFQ6JywgY2FydC5tYXAocXVhbnRpdHkpKVxyXG4gICAgY2FydC5zcGxpY2UoMClcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHF1YW50aXR5KGQpe1xyXG4gICAgcmV0dXJuIChkLnF1YW50aXR5ID0gY2FydC5maWx0ZXIoYnkoJ2lkJywgZC5pZCkpLmxlbmd0aCksIGRcclxuICB9XHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGhvc3QgPSB0aGlzLmhvc3RcclxuICAgICwgcHJvZHVjdCA9IHNlbChob3N0KS5kYXR1bSgpXHJcblxyXG4gIGlmICghcHJvZHVjdCkgcmV0dXJuXHJcblxyXG4gIHZhciBzZWxmID0gb25jZSh0aGlzLCAnZGl2JylcclxuICAgICAgICAuY2xhc3NlZCgndWstcGFuZWwgdWstcGFuZWwtYm94IHVrLW1hcmdpbi1ib3R0b20nLCB0cnVlKVxyXG5cclxuICBvbmNlKHNlbGYsICdpbWcnKVxyXG4gICAgLmNsYXNzZWQoJ3VrLXRodW1ibmFpbCB1ay10aHVtYm5haWwtbWluaSB1ay1hbGlnbi1sZWZ0JywgdHJ1ZSlcclxuICAgIC5hdHRyKCdzcmMnLCBwcm9kdWN0LmltYWdlKVxyXG5cclxuICBvbmNlKHNlbGYsICdoNCcpXHJcbiAgICAuY2xhc3NlZCgndWstaDQnLCB0cnVlKVxyXG4gICAgLmh0bWwocHJvZHVjdC50aXRsZSArICcgLSAmZXVybzsnICsgcHJvZHVjdC5wcmljZSlcclxuXHJcbiAgb25jZShzZWxmLCAnYnV0dG9uJylcclxuICAgIC5jbGFzc2VkKCd1ay1idXR0b24gdWstYnV0dG9uLXNtYWxsIHVrLWJ1dHRvbi1wcmltYXJ5JywgdHJ1ZSlcclxuICAgIC5hdHRyKCdzcmMnLCBwcm9kdWN0LmltYWdlKVxyXG4gICAgLmF0dHIoJ2Rpc2FibGVkJywgcHJvZHVjdC5pbnZlbnRvcnkgPyBudWxsIDogMSlcclxuICAgIC5vbignY2xpY2snLCBhZGRUb0NhcnQpXHJcbiAgICAudGV4dChwcm9kdWN0LmludmVudG9yeSA/ICdBZGQgdG8gY2FydCcgOiAnU29sZCBPdXQnKVxyXG5cclxuICBmdW5jdGlvbiBhZGRUb0NhcnQoZCl7XHJcbiAgICBwcm9kdWN0LmludmVudG9yeS0tXHJcbiAgICByaXBwbGUoJ2NhcnQnKS5wdXNoKHByb2R1Y3QpXHJcbiAgfVxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihwcm9kdWN0cyl7XHJcbiAgb25jZSh0aGlzLCAnaDInKVxyXG4gICAgLnRleHQoJ0ZsdXggU2h1cCBEZW1vIChSaXBwbGUpJylcclxuICAgIC5jbGFzc2VkKCd1ay1oMicsIHRydWUpXHJcblxyXG4gIG9uY2UodGhpcywgJ3Byb2R1Y3RzLWxpc3QnKS5hdHRyKCdkYXRhJywgJ3Byb2R1Y3RzJylcclxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocHJvZHVjdHMpIHtcclxuICBvbmNlKHRoaXMsICdwcm9kdWN0LWl0ZW0nLCBwcm9kdWN0cykuYXR0cignZGVsYXknLCAwKVxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xyXG4gIG9uY2UodGhpcywgJ3Byb2R1Y3RzLWNvbnRhaW5lcicpXHJcbiAgb25jZSh0aGlzLCAnY2FydC1jb250YWluZXInKS5hdHRyKCdkYXRhJywgJ2NhcnQnKVxyXG59XHJcblxyXG5cclxuXHJcbiJdfQ==
