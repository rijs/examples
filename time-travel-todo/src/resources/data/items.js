import versioned from 'versioned'

export default {
  name: 'items'
, body: versioned([
    { item: 'lorem', completed: true }
  , { item: 'ipsum', completed: false }
  ])
}