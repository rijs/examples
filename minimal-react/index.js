var app    = require('express')()
  , server = require('http').createServer(app)
  , ripple = require('rijs').default(server)

ripple
  .resource('tweets', ['lorem', 'ipsum'])

server.listen(4000)

app.get('/', function(req, res){
  res.render('index.jade')
})