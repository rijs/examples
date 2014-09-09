var app    = require('express')()
  , server = require('http').createServer(app)
  , ripple = require('ripple')(server, app)

ripple
  .resource('tweets.data', ['lorem', 'ipsum'])
  .resource('twitter-feed.js', function(d){
    d3.select(this)
      .style('color', 'green')
      .selectAll('li')
      .data(d)
      .enter()
      .append('li')
      .text(String)
  })

server.listen(4000)

app.get('/', function(req, res){
  res.render('index.jade')
})