export default (node, { stories }) => {
  const o = once(node)
      , STORY_HEIGHT = 52 
      , items = values(stories).sort(za('latest'))
      , scoresChanged = node.changes
          .filter(by('name', 'stories'))
          .filter(by('key', includes('score')))
          .reduce(to.obj(d => d.key.split('.').shift()), {})
      , commentsChanged = node.changes
          .filter(by('name', 'stories'))
          .filter(by('key', includes('descendants')))
          .reduce(to.obj(d => d.key.split('.').shift()), {})

  o.classed('is-loading', !items.length)
   .attr('style', `height: ${STORY_HEIGHT * items.length}px`)

  o('h1', 1)
    .text('Realtime HN')

  o('hn-story', items, d => d.id)
    .classed('score-changed', d => d.id in scoresChanged)
    .classed('comments-changed', d => d.id in commentsChanged)
    .each((el, d, i) => 
      el.animate(
        { transform: [`translateY(${is.def(el.currentPos) ? el.currentPos : -52}px)`, `translateY(${el.currentPos = STORY_HEIGHT*i}px)`] }
      , { duration: 500, fill: 'forwards', easing: 'ease-in-out' }
      )
    )
}