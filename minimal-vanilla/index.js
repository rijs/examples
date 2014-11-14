var app    = require('express')()
  , server = require('http').createServer(app)
  , ripple = require('ripple')(server, app)

ripple
  .resource('tweets.data', ['lorem', 'ipsum'])
  .resource('twitter-feed.js', function(d){
    this.style.color = 'green'
    this.innerHTML = d
      .map(function(d){ return '<li>' + d + '</li>' })
      .join('') 
  })

server.listen(4000)

app.get('/', function(req, res){
  res.render('index.jade')
})