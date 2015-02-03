var app    = require('express')()
  , server = require('http').createServer(app)
  , ripple = require('ripple')(server, app)

ripple
  .resource('tweets', ['lorem', 'ipsum'])
  .resource('twitter-feed', function(d){
    this.host.style.color = 'green'
    this.innerHTML = '<li>' + d.join('</li><li>') + '</li>'
  })

server.listen(4000)

app.get('/', function(req, res){
  res.render('index.jade')
})