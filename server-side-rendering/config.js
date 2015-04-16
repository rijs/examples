module.exports = {
    port: 4001
  , log: console.log.bind(console, '[rijs]')
  , ripple: {
      client: false
    , utils: true
    }
  }

global.render = function(jade){
  return function(req, res) {
    log('rendering', jade)
    res.render(__dirname + '/views/' + jade+'.jade')
  }
}

global.redirect = function(path) {
  return function(req, res){
    res.redirect(path)
  }
}

global.rand = function(scale){
  return ~~(Math.random()*scale)
}