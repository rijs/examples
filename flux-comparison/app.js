var bulk = require('bulk-require');
var resources = bulk(__dirname, ['resources/*']).resources

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