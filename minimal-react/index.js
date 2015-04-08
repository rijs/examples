var app    = require('express')()
  , server = require('http').createServer(app)
  , ripple = require('ripple')(server, { client: false })

ripple
  .resource('tweets', ['lorem', 'ipsum'])

server.listen(4000)

app.get('/', function(req, res){
  res.render('index.jade')
})