'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_firebase2.default.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' });

var hn = _firebase2.default.database().ref('/v0');

var items = hn.child('updates/items');

var item = function item(id) {
  return hn.child('item/' + id).once('value');
};

exports.default = { items: items, item: item };