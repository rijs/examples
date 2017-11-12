const firebase = require('firebase')

firebase.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' })

const hn = firebase
  .database()
  .ref('/v0')

const items = hn.child('updates/items')

const item = id => hn
  .child(`item/${id}`)
  .once('value')

module.exports = { items, item }