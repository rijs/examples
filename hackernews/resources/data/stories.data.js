// setup subscription
const loaded = (ripple, { body }) => hn.items
  .on('value', snapshot => snapshot
    .val()
    .map((d, i) => time(i*1400, t => hn.item(d).then(d => {
      const story = d.val()
          , { id } = story

      if (story.type !== 'story') 
        return 
      
      if (story.deleted) 
        return remove(id)(body)
      
      if (!(id in body)) 
        update(id, story)(body)
      
      if (id in body && story.score !== body[id].score)
        update(`${id}.score`, story.score)(body)
      
      if (id in body && story.descendants !== body[id].descendants) 
        update(`${id}.descendants`, story.descendants)(body)
      
      update(`${id}.latest`, ++latest)(body)
      log('update'.green, id)
      prune(body) }))))

const prune = stories => values(stories)
  .sort(az('latest'))
  .slice(0, -MAX_CACHE_SIZE)
  .map(({ id }) => remove(id)(stories))

module.exports = {
  name: 'stories'
, body: {}
, headers: { loaded }
}

let latest = 0
const MAX_CACHE_SIZE = 20
    , log = require('utilise/log')('[hn]')
    , hn = require('../../services/hn')
    , update = require('utilise/update')
    , remove = require('utilise/remove')
    , values = require('utilise/values')
    , time = require('utilise/time')
    , not = require('utilise/not')
    , az = require('utilise/az')
    , is = require('utilise/is')
    , by = require('utilise/by')