var app    = require('express')()
  , server = require('http').createServer(app)
  , ripple = require('ripple')(server)

ripple
  .resource('tweets', ['lorem', 'ipsum'])
  .resource('twitter-feed', function(d){
    var TwitterFeed = React.createClass({ displayName: 'TwitterFeed',
      render: function() {
        var createLi = function(itemText) {
          return React.createElement("li", null, itemText)
        }
        return React.createElement("ul", null, this.props.items.map(createLi))
      }
    })

    // React does not like rendering on Shadow Root..
    var root = this.firstChild || this.appendChild(document.createElement('div'))

    React.render(React.createElement(TwitterFeed, { items: d }), root)
  })

server.listen(4000)

app.get('/', function(req, res){
  res.render('index.jade')
})