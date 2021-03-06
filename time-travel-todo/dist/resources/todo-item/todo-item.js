'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = item;
function item(d, i) {
  if ('key' in d && d.key != --i) return;

  var complete = function complete(el) {
    return function (d) {
      return update(i + '.completed', el.checked)(ripple('items'));
    };
  },
      destroy = function destroy(el) {
    return function (d) {
      return remove(i)(ripple('items'));
    };
  },
      o = once(this);

  o('input', 1).property('checked', d.completed).on('click.complete', th(complete)).attr('type', 'checkbox');

  o('label', 1).text(d.item);

  o('button.destroy', 1).on('click.destroy', th(destroy));
}