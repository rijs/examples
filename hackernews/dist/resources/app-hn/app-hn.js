'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (node, _ref) {
  var stories = _ref.stories;

  var o = once(node),
      STORY_HEIGHT = 52,
      items = values(stories).sort(za('latest')),
      scoresChanged = node.changes.filter(by('name', 'stories')).filter(by('key', includes('score'))).reduce(to.obj(function (d) {
    return d.key.split('.').shift();
  }), {}),
      commentsChanged = node.changes.filter(by('name', 'stories')).filter(by('key', includes('descendants'))).reduce(to.obj(function (d) {
    return d.key.split('.').shift();
  }), {});

  o.classed('is-loading', !items.length).attr('style', 'height: ' + STORY_HEIGHT * items.length + 'px');

  o('h1', 1).text('Realtime HN');

  o('hn-story[sync="true"]', items, function (d) {
    return d.id;
  }).classed('score-changed', function (d) {
    return d.id in scoresChanged;
  }).classed('comments-changed', function (d) {
    return d.id in commentsChanged;
  }).each(function (el, d, i) {
    return el.animate({ top: [el.currentPos || '-52px', el.currentPos = STORY_HEIGHT * i + 'px'] }, { duration: 500, fill: 'forwards' });
  });
};