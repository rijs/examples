var static = require('serve-static')(__dirname)
  , app    = require('express')()
  , server = require('http').createServer(app)
  , ripple = require('ripple')(server)
 
ripple
  .db(process.env.DATABASE_URL)
  .resource('squares', [])
  .resource('squares-canvas', function squares(data){
    var cell = 15
      , size = 40
      , fill = Array(1600)
      , join

    data.forEach(mark)

    join = d3.select(this)
      .selectAll('square')
      .data(fill)
  
    join.enter()
      .append('xhtml:square')
      .on('click', function(d, i){  
        ripple('squares').push({ 
          square: i
        , value: !d
        })
      })

    join
      .style('top' , function(d, i){ return ~~(i/size)*cell + 'px' })
      .style('left', function(d, i){ return   (i%size)*cell + 'px' })

    join
      .classed('is-selected', Boolean)
      
    join.exit()
      .remove()

    function mark(d){
      fill[d.square] = d.value
    }
  })

server.listen(process.env.PORT || 5000) 

app
  .use(static)
  .get('/', function(req, res){
    res.render('index.jade')
  })