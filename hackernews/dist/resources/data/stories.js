'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _update = require('utilise/update');

var _update2 = _interopRequireDefault(_update);

var _remove = require('utilise/remove');

var _remove2 = _interopRequireDefault(_remove);

var _values = require('utilise/values');

var _values2 = _interopRequireDefault(_values);

var _time = require('utilise/time');

var _time2 = _interopRequireDefault(_time);

var _not = require('utilise/not');

var _not2 = _interopRequireDefault(_not);

var _az = require('utilise/az');

var _az2 = _interopRequireDefault(_az);

var _is = require('utilise/is');

var _is2 = _interopRequireDefault(_is);

var _by = require('utilise/by');

var _by2 = _interopRequireDefault(_by);

var _hn = require('../../services/hn');

var _hn2 = _interopRequireDefault(_hn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setup subscription
var loaded = function loaded(ripple, _ref) {
  var body = _ref.body;
  return _hn2.default.items.on('value', function (snapshot) {
    return snapshot.val().map(function (d, i) {
      return (0, _time2.default)(i * 1400, function (t) {
        return _hn2.default.item(d).then(function (d) {
          var story = d.val(),
              id = story.id;


          if (story.type !== 'story') return;

          if (story.deleted) return (0, _remove2.default)(id)(body);

          if (!(id in body)) (0, _update2.default)(id, story)(body);

          if (id in body && story.score !== body[id].score) (0, _update2.default)(id + '.score', story.score)(body);

          if (id in body && story.descendants !== body[id].descendants) (0, _update2.default)(id + '.descendants', story.descendants)(body);

          (0, _update2.default)(id + '.latest', ++latest)(body);
          log('update'.green, id);
          prune(body);
        });
      });
    });
  });
};

var prune = function prune(stories) {
  return (0, _values2.default)(stories).sort((0, _az2.default)('latest')).slice(0, -MAX_CACHE_SIZE).map(function (_ref2) {
    var id = _ref2.id;
    return (0, _remove2.default)(id)(stories);
  });
};

exports.default = {
  name: 'stories',
  body: {},
  headers: { loaded: loaded }
};

// setInterval(d => update('a', 'a')(ripple('stories')), 2000)

var latest = 0;
var MAX_CACHE_SIZE = 30,
    log = require('utilise/log')('[hn]');