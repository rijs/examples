'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = todo;
function todo(_ref) {
  var items = _ref.items;
  var filter = _ref.filter;
  var o = once(this);
  var current = filter.current;
  var visible = current == 'Completed' ? items.filter(by('completed', true)) : current == 'Active' ? items.filter(by('completed', false)) : items;

  o('input', 1).property('placeholder', 'What needs to be done?').attr('type', 'text').on('keypress', addItem);

  o('todo-footer', { items: items, filter: filter });

  o('todo-item', changed(visible), null, 'todo-footer');

  function addItem() {
    if (window.event.which != 13 || !this.value) return;

    push({
      item: this.value,
      completed: false
    })(items);

    this.value = '';
  }

  function changed(items) {
    var _o$node = o.node();

    var change = _o$node.change;
    var key;

    return change.length !== 1 ? items : !change[0] ? items : change[0][0] !== 'items' ? items : !isFinite(key = change[0][1].key.split('.').shift()) ? items : items.map(function (_ref2) {
      var completed = _ref2.completed;
      var item = _ref2.item;
      return { completed: completed, item: item, key: key };
    });
  }
}