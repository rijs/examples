var app    = require('express')()
  , server = require('http').createServer(app)
  , ripple = require('ripple')(server, app)

ripple
  .resource('tweets.data', ['lorem', 'ipsum'])
  .resource('twitter-feed.js', function(d){
    var TwitterFeed = React.createClass({ displayName: 'TwitterFeed',
      render: function() {
        var createLi = function(itemText) {
          return React.createElement("li", null, itemText)
        }
        return React.createElement("ul", null, this.props.items.map(createLi))
      }
    })

    React.render(React.createElement(TwitterFeed, { items: d }), this)
  })

server.listen(4000)

app.get('/', function(req, res){
  res.render('index.jade')
})