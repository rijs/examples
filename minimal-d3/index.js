var app    = require('express')()
  , server = require('http').createServer(app)
  , ripple = require('rijs').default(server)

ripple('tweets', ['lorem', 'ipsum'])
ripple('twitter-feed', function(data){
  d3.select(this)
    .selectAll('li')
    .data(data.tweets)
    .enter()
    .append('xhtml:li')
    .text(String)
    .style('color', 'green')
})

server.listen(4000)

app.get('/', function(req, res){
  res.render('index.jade')
})