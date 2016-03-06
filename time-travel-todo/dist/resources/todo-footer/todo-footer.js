'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = footer;
function footer(_ref) {
  var items = _ref.items;
  var filter = _ref.filter;

  var toggle = function toggle(d) {
    return update('current', d)(filter);
  },
      clear = function clear(d) {
    return ripple('items', items.filter(by('completed', false)));
  },
      uncompleted = items.filter(by('completed', false)),
      completed = items.filter(by('completed', true)),
      o = once(this);

  o('span.counter', 1).text(uncompleted.length + ' item' + (~ -uncompleted.length ? 's' : '') + ' left');

  o('button.filter', ['All', 'Active', 'Completed']).on('click.filter', toggle).classed('selected', is(filter.current)).text(String);

  o('a.clear', !completed.length).text('Clear Completed (' + completed.length + ')').on('click.clear', clear);
}