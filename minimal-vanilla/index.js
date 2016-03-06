var app    = require('express')()
  , server = require('http').createServer(app)
  , ripple = require('rijs').default(server)

ripple
  .resource('tweets', ['lorem', 'ipsum'])
  .resource('twitter-feed', function(data){
    this.host.style.color = 'green'
    this.innerHTML = '<li>' + data.tweets.join('</li><li>') + '</li>'
  })

server.listen(5000)

app.get('/', function(req, res){
  res.render('index.jade')
})