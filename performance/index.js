var static = require('serve-static')(__dirname)
  , app    = require('express')()
  , server = require('http').createServer(app)
  , ripple = require('ripple')(server, app)
  , prices = []
 
server.listen(3000) 

ripple
  .resource('damn-fast-grid', require('./resources/damn-fast-grid'))
  .resource('live-cell', require('./resources/live-cell'))


// setTimeout(
//   function () {
//     for (var i = 0; i < 100; i++)
//       for (var j = 0; j < 100; j++) {
//         !prices[i] && (prices[i] = [])
//         prices[i][j] = []
//         ripple.resource('/prices/'+i+'/'+j, prices[i][j], { versions: false })
//         // setInterval(regen(i, j), time(i, j))
//       }
//     setInterval(regen, 1000)
//   }
// , 5000)


app
  .use(static)
  .get('/', function(req, res){
    res.render('index.jade')
  })

function rand() {
  return ~~(Math.random()*100)
}

function regen() {
  for (var x = 0; x < 1000; x++)
    setTimeout(function(){
      var i = ~~(Math.random()*100)
        , j = ~~(Math.random()*100)

      prices[i][j][0] = rand() 
    }, x)

  // return function(){
  //   prices[i][j][0] = rand()
  // }
}

function time(i, j) {
  return 100*(((i+1)*100)+(j+1)) //50*(1+rand())
}