export default { 
  name: 'routes'
, body: {}
, headers: {
    cache: 'no-store' 
  , helpers: { routes }
  }
}

function routes({ next, url }) {
  const categories = ripple('categories')
      , list       = ({ next })      => next({ ':category': category }) 
      , category   = ({ current })   => current in categories || '/' 
      
  return next({ list }) || url == '/' || '/'
}