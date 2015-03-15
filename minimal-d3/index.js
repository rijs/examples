var app    = require('express')()
  , server = require('http').createServer(app)
  , ripple = require('ripple')(server, app)

ripple('tweets', ['lorem', 'ipsum'])
ripple('twitter-feed', function(d){
    d3.select(this)
      .selectAll('li')
      .data(d)
      .enter()
      .append('li')
      .text(String)
      .style('color', 'green')
  })

server.listen(4000)

app.get('/', function(req, res){
  res.render('index.jade')
})