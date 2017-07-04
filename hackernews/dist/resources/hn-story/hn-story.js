'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'hn-story',
  body: body,
  headers: { sync: true, needs: '[css]' }
};


function body(node, _ref) {
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