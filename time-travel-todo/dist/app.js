(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
ripple(require('./dist/index.js'))

},{"./dist/index.js":2}],2:[function(require,module,exports){
module.exports = [
require('./resources/data/filter.js').default || require('./resources/data/filter.js'),
require('./resources/data/items.js').default || require('./resources/data/items.js'),
require('./resources/data/versions.js').default || require('./resources/data/versions.js'),
{"name":"timetravel-debugger.css","body":":host {\r\n  position: absolute;\r\n  left: 20px;\r\n  top: 20px;\r\n  background: white; \r\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);  }\r\n\r\n  :host(::before) {\r\n    content: 'Time Travel';\r\n    font-weight: bold;\r\n    display: block;\r\n    padding: 20px; }\r\n\r\n  a {\r\n    display: block; \r\n    padding: 0px 20px 15px 35px; \r\n    font-weight: bold; }\r\n\r\n  a span {\r\n    position: relative;\r\n    padding: 0px 5px; \r\n    font-weight: normal; }\r\n\r\n  a span::before {\r\n    content: attr(details);\r\n    opacity: 0;\r\n    pointer-events: none;\r\n    position: absolute; \r\n    top: 110%; \r\n    font-family: monospace;\r\n    font-size: 11px;\r\n    background: black;\r\n    color: white;\r\n    line-height: 21px;\r\n    padding: 5px;\r\n    border-radius: 5px; }\r\n\r\n  a span:hover::before {\r\n    opacity: 0.9; }"},
{"name":"timetravel-debugger","body":require('./resources/timetravel-debugger/timetravel-debugger.js').default || require('./resources/timetravel-debugger/timetravel-debugger.js'),"headers":{"needs":"[css]"}},
{"name":"todo-app.css","body":"*, *::before, *::after { box-sizing: border-box; }\r\n\r\n:host {\r\n  max-width: 550px;\r\n  margin: 0 auto;\r\n  -webkit-font-smoothing: antialiased; \r\n  display: block;\r\n  background: #fff;\r\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1); }\r\n\r\n  [type=text] {\r\n    background: rgba(0,0,0,0);\r\n    display: block;\r\n    height: 50px;\r\n    width: 100%;\r\n    font-size: 20px;\r\n    font-family: inherit;\r\n    outline: none;\r\n    padding: 14px;\r\n    border: none;\r\n    border-bottom: 1px solid #ededed; \r\n    box-shadow: rgba(0, 0, 0, 0.027451) 0px 2px 1px ; }"},
{"name":"todo-app","body":require('./resources/todo-app/todo-app.js').default || require('./resources/todo-app/todo-app.js'),"headers":{"needs":"[css]"}},
{"name":"todo-footer.css","body":":host {\r\n  font-size: 12px;\r\n  color: #777;\r\n  display: block; \r\n  text-align: center;\r\n  position: relative; }\r\n  \r\n  :host(::before) {\r\n    content: '';\r\n    position: absolute;\r\n    right: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    height: 50px;\r\n    overflow: hidden;\r\n    pointer-events: none;\r\n    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2); }\r\n\r\n  .counter {\r\n    position: absolute; \r\n    left: 15px; \r\n    top: 14px; }\r\n\r\n  .filter {\r\n    background: none;\r\n    font-family: inherit;\r\n    cursor: pointer;    \r\n    color: inherit;\r\n    margin: 10px;\r\n    padding: 3px 7px;\r\n    text-decoration: none;\r\n    border: 1px solid transparent;\r\n    border-radius: 3px; }\r\n\r\n  .filter:hover {\r\n    border-color: rgba(175, 47, 47, 0.1); }\r\n\r\n  .filter.selected {\r\n    border-color: rgba(175, 47, 47, 0.2); }\r\n\r\n  .clear {\r\n    position: absolute; \r\n    right: 15px; \r\n    top: 14px; }\r\n\r\n  a:hover {\r\n    cursor: pointer;\r\n    text-decoration: underline; }"},
{"name":"todo-footer","body":require('./resources/todo-footer/todo-footer.js').default || require('./resources/todo-footer/todo-footer.js'),"headers":{"needs":"[css]"}},
{"name":"todo-item.css","body":":host {\r\n  display: block; \r\n  background: white;\r\n  position: relative;\r\n  font-size: 24px;\r\n  border-bottom: 1px solid #ededed; }\r\n\r\n  label  {\r\n    white-space: pre;\r\n    word-break: break-word;\r\n    padding: 15px 60px 15px 15px;\r\n    margin-left: 45px;\r\n    display: block;\r\n    line-height: 1.2;\r\n    transition: color 0.4s; }\r\n\r\n  :checked + label  {\r\n    color: #d9d9d9;\r\n    text-decoration: line-through; }\r\n\r\n  .destroy  {\r\n    -webkit-appearance: none;\r\n    -webkit-font-smoothing: antialiased; \r\n    cursor: pointer; \r\n    outline: none;\r\n    font-family: inherit;\r\n    border: 0;\r\n    background: none;\r\n    display: none;\r\n    position: absolute;\r\n    top: 5px;\r\n    right: 10px;\r\n    width: 40px;\r\n    height: 40px;\r\n    font-size: 30px;\r\n    color: #cc9a9a;\r\n    transition: color 0.2s ease-out; }\r\n\r\n  .destroy::after  {\r\n    content: '×'; }\r\n\r\n  :host(:hover) .destroy  {\r\n    display: block }\r\n\r\n  .destroy:hover  {\r\n    color: #af5b5e; }\r\n\r\n  [type=checkbox] {\r\n    text-align: center;\r\n    width: 40px;  \r\n    height: 40px; \r\n    outline: none;\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    margin: auto 0;\r\n    border: none;\r\n    -webkit-appearance: none; }\r\n\r\n  [type=checkbox]::after {\r\n    content: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"-10 -18 100 135\"><circle cx=\"50\" cy=\"50\" r=\"50\" fill=\"none\" stroke=\"#ededed\" stroke-width=\"3\"/></svg>'); }\r\n\r\n  [type=checkbox]:checked::after {\r\n    content: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"-10 -18 100 135\"><circle cx=\"50\" cy=\"50\" r=\"50\" fill=\"none\" stroke=\"#bddad5\" stroke-width=\"3\"/><path fill=\"#5dc2af\" d=\"M72 25L42 71 27 56l-4 4 20 20 34-52z\"/></svg>'); }\r\n"},
{"name":"todo-item","body":require('./resources/todo-item/todo-item.js').default || require('./resources/todo-item/todo-item.js'),"headers":{"needs":"[css]"}}]
},{"./resources/data/filter.js":3,"./resources/data/items.js":4,"./resources/data/versions.js":5,"./resources/timetravel-debugger/timetravel-debugger.js":6,"./resources/todo-app/todo-app.js":7,"./resources/todo-footer/todo-footer.js":8,"./resources/todo-item/todo-item.js":9}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'filter',
  body: { current: 'All' },
  headers: { log: 10 }
};
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'items',
  body: [{ item: 'lorem', completed: true }, { item: 'ipsum', completed: false }],
  headers: { log: 10 }
};
},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'versions',
  body: []
};
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debug;
function debug(_ref) {
  var versions = _ref.versions;

  var o = once(this),
      label = function label(d) {
    return d.name + ' (' + d.index + ')';
  },
      details = function details(d) {
    return str(ripple.version.calc(d.name, d.index));
  };

  o('a', versions).text(function (d, i) {
    return i;
  }).on('click.rollback', function (d, i) {
    return ripple.version(i);
  })('span', function (d) {
    return d;
  }).attr('details', details).text(label);

  ripple.on('change.debugger', function (name) {
    return name !== 'versions' && ripple('versions', ripple.version.log);
  });

  if (!versions.length) ripple.on.change.debugger();
}
},{}],7:[function(require,module,exports){
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

  o('todo-item', visible, null, 'todo-footer').each(ripple.draw);

  function addItem() {
    if (window.event.which != 13 || !this.value) return;

    push({
      item: this.value,
      completed: false
    })(items);

    this.value = '';
  }
}
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = item;
function item(d, i) {
  var complete = function complete(el) {
    return function (d) {
      return update(i - 1 + '.completed', el.checked)(ripple('items'));
    };
  },
      destroy = function destroy(el) {
    return function (d) {
      return remove(i - 1)(ripple('items'));
    };
  },
      o = once(this);

  o('input', 1).property('checked', d.completed).on('click.complete', th(complete)).attr('type', 'checkbox');

  o('label', 1).text(d.item);

  o('button.destroy', 1).on('click.destroy', th(destroy));
}
},{}]},{},[1]);
