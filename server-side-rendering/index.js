var app    = require('express')()
  , http   = require('http').createServer(app)
  , config = require('./config')
  , ripple = require('ripple')(http)
  , serve  = require('serve-static')
  , log    = config.log
  , prices

global.ripple = ripple
  .resource('prices', prices = [10,20,30,40,50,60,70,80,90,100], { from: from, to: to, cache: null })

setInterval(function(){
  prices.push(rand(100))
  if (prices.length > 1000) prices.splice(0, prices.length-12)
}, 200)

app.use('/', serve(__dirname + '/public'))
app.use('/', serve(__dirname + '/node_modules'))
app.get('/', render('/hybrid'))

http.listen(config.port)
log('listening', config.port)

function from() { return false }

function to(body){ 
  return body
    .map(function(d,i,a){ return { x1: i, x2: i+1, y1: a[i], y2: a[i+1] } })
    .slice(-11, -1) 
}