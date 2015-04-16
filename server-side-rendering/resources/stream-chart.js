module.exports = function(data){
  var self = this
    
  this.host
    && once(this, 'content')
    && (self = this.host)

  if (window.prerender && attr(self, 'skip-prerender')) 
    return log('skipping prerender')

  var stats = self.stats = self.stats || { created: 0 }

  var width = 665
    , height = 313
    , current = data[1].x1

  var x = d3.scale.linear()
      .range([0, width])
      .domain([0, 10])

  var y = d3.scale.linear()
      .range([height-60, 30])
      .domain([0, 100])

  var svg = once(self, 'svg.chart')
      .attr('width', width)
      .attr('height', height)

  var chart = once(svg, 'g')
      .style('transform', 'translate(-' + (x(current)) + 'px, 30px)')

  once(svg, 'line.y.axis')
    .attr('x1', width-20)
    .attr('x2', width-20)
    .attr('y1', 0)
    .attr('y2', height)

  once(chart, 'line', data, null/*, name*/)
    // .attr('key', key('x1'))
    .attr('x1', function(d) { return x(+d.x1) })
    .attr('y1', function(d) { return y(+d.y1) })
    .attr('x2', function(d) { return x(+d.x2) })
    .attr('y2', function(d) { return y(+d.y2) })
    .style('opacity', function(d,i){ return i/11 })
    .style('stroke-width', function(d,i){ return i+'px' })
    .in.each(function(d){ stats.created++ })

  function name(d){
    return d ? +d.x1 : +attr(this, 'key')
  }

  once(self, 'label.created', [stats.created]).text(Number)
}