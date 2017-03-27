'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, [{
    key: 'render',
    value: function render(node, _ref) {
      var id = _ref.id,
          _ref$title = _ref.title,
          title = _ref$title === undefined ? '' : _ref$title,
          _ref$descendants = _ref.descendants,
          descendants = _ref$descendants === undefined ? 0 : _ref$descendants,
          _ref$score = _ref.score,
          score = _ref$score === undefined ? 0 : _ref$score,
          url = _ref.url;

      var o = once(node);

      o('a.title', 1).attr('href', url).text(title);

      o('a.comments', 1).attr('href', 'https://news.ycombinator.com/item?id=' + id).text(descendants);

      o('span.score', 1).text(score);
    }
  }], [{
    key: 'async',
    get: function get() {
      return true;
    }
  }]);

  return _class;
}();

exports.default = _class;