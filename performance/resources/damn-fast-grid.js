module.exports = function(){
  var size = 10000
    , length = Math.sqrt(size)
    , cells = once(this, 'live-cell', d3.range(size))
        .style('top', px(i))
        .style('left', px(j))
        .attr('data', function(d){ 
          return '/prices/' 
               + i(d)
               + '/'
               + j(d)
        })

  function i(d) {
    return ~~(d/length)
  }

  function j(d) {
    return (d%length)
  }

  function px(fn) {
    return function(d){
      return 50+fn(d)*20 + 'px'
    }
  }

}