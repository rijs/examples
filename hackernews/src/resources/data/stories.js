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

export default {
  name: 'stories'
, body: {}
, headers: { loaded }
}

// setInterval(d => update('a', 'a')(ripple('stories')), 2000)

let latest = 0
const MAX_CACHE_SIZE = 20
    , log = require('utilise/log')('[hn]')

import update from 'utilise/update'
import remove from 'utilise/remove'
import values from 'utilise/values'
import time from 'utilise/time'
import not from 'utilise/not'
import az from 'utilise/az'
import is from 'utilise/is'
import by from 'utilise/by'
import hn from '../../services/hn'