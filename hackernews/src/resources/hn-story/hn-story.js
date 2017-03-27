export default {
  name: 'hn-story'
, body
, headers: { sync: true, needs: '[css]' }
}

function body(node, { id, title = '', descendants = 0, score = 0, url }){
  const o = once(node)

  o('a.title', 1)
    .attr('href', url)
    .text(title)

  o('a.comments', 1)
    .attr('href', `https://news.ycombinator.com/item?id=${id}`)
    .text(descendants)

  o('span.score', 1)
    .text(score)
}