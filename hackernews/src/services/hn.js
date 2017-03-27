import firebase from 'firebase'

firebase.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' })

const hn = firebase
  .database()
  .ref('/v0')

const items = hn.child('updates/items')

const item = id => hn
  .child(`item/${id}`)
  .once('value')

export default { items, item }