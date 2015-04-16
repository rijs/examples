var fs = require('fs')

module.exports = function(ripple){
  // if (err) return log('failed to auto-load from resources folder', err)
  fs.readdirSync('./resources')
    .forEach(function(path){
      var js = ~path.indexOf('.js')
        , name = js ? path.replace('.js', '') : path
      ripple(name, (js ? require : file)('./resources/'+path))
    })
}