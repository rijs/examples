(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolve = exports.router = undefined;

var _client = require('utilise/client');

var _client2 = _interopRequireDefault(_client);

var _keys = require('utilise/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('utilise/log')('[router]');
var go = function go(url) {
  return (window.event && window.event.preventDefault(), true), history.pushState({}, '', url), window.dispatchEvent(new CustomEvent('change')), url;
};

var router = function router(routes) {
  return !_client2.default ? route : route({ url: location.pathname });

  function route(req, res, next) {
    var from = req.url,
        resolved = resolve(routes)(req),
        to = resolved.url;

    if (from !== to) log('router redirecting', from, to);
    if (_client2.default) location.params = resolved.params;

    return _client2.default && from !== to ? (go(to), resolved) : !_client2.default && from !== to ? res.redirect(to) : !_client2.default ? next() : resolved;
  }
};

var resolve = function resolve(root) {
  return function (req, from) {
    var params = {},
        url = from || req.url,
        to = root({ url: url, req: req, params: params, next: next(req, url, params) });

    return to !== true ? resolve(root)(req, to) : { url: url, params: params };
  };
};

var next = function next(req, url, params) {
  return function (handlers) {
    var _segment = segment(url);

    var first = _segment.first;
    var last = _segment.last;
    var to = '';

    return first in handlers ? handlers[first]({ req: req, next: next(req, last, params), params: params, current: first }) : (0, _keys2.default)(handlers).filter(function (k) {
      return k[0] == ':';
    }).some(function (k) {
      var pm = k.slice(1);
      if (to = handlers[k]({ req: req, next: next(req, last, params), params: params, current: first })) params[pm] = first;

      return to;
    }) && to;
  };
};

function segment(url) {
  var segments = url.split('/').filter(Boolean);
  return { first: segments.shift(), last: segments.join('/') };
}

if (_client2.default) {
  window.go = go;
  window.router = router;
  window.addEventListener('popstate', function (e) {
    return window.dispatchEvent(new CustomEvent('change'));
  });
  window.addEventListener('change', function (e) {
    return e.target == window && (window.app || document).draw && (window.app || document).draw();
  });
  document.addEventListener('click', function (e) {
    var a = e.path ? e.path.shift() : e.target;
    if (!a.matches('a[href]:not([href^=javascript]):not(.bypass)')) return;
    if (a.origin != location.origin) return;
    // console.log("e", a.href)
    e.preventDefault();
    go(a.href);
  });
}

exports.router = router;
exports.resolve = resolve;
},{"utilise/client":2,"utilise/keys":4,"utilise/log":5}],2:[function(require,module,exports){
module.exports = typeof window != 'undefined'
},{}],3:[function(require,module,exports){
module.exports = is
is.fn     = isFunction
is.str    = isString
is.num    = isNumber
is.obj    = isObject
is.lit    = isLiteral
is.bol    = isBoolean
is.truthy = isTruthy
is.falsy  = isFalsy
is.arr    = isArray
is.null   = isNull
is.def    = isDef
is.in     = isIn

function is(v){
  return function(d){
    return d == v
  }
}

function isFunction(d) {
  return typeof d == 'function'
}

function isBoolean(d) {
  return typeof d == 'boolean'
}

function isString(d) {
  return typeof d == 'string'
}

function isNumber(d) {
  return typeof d == 'number'
}

function isObject(d) {
  return typeof d == 'object'
}

function isLiteral(d) {
  return typeof d == 'object' 
      && !(d instanceof Array)
}

function isTruthy(d) {
  return !!d == true
}

function isFalsy(d) {
  return !!d == false
}

function isArray(d) {
  return d instanceof Array
}

function isNull(d) {
  return d === null
}

function isDef(d) {
  return typeof d !== 'undefined'
}

function isIn(set) {
  return function(d){
    return !set ? false  
         : set.indexOf ? ~set.indexOf(d)
         : d in set
  }
}
},{}],4:[function(require,module,exports){
module.exports = function keys(o) {
  return Object.keys(o || {})
}
},{}],5:[function(require,module,exports){
var is = require('utilise/is')
  , to = require('utilise/to')
  , owner = require('utilise/owner')

module.exports = function log(prefix){
  return function(d){
    if (!owner.console || !console.log.apply) return d;
    is.arr(arguments[2]) && (arguments[2] = arguments[2].length)
    var args = to.arr(arguments)
    args.unshift(prefix.grey ? prefix.grey : prefix)
    return console.log.apply(console, args), d
  }
}
},{"utilise/is":3,"utilise/owner":6,"utilise/to":7}],6:[function(require,module,exports){
(function (global){
module.exports = require('utilise/client') ? /* istanbul ignore next */ window : global
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"utilise/client":2}],7:[function(require,module,exports){
module.exports = { 
  arr: toArray
, obj: toObject
}

function toArray(d){
  return Array.prototype.slice.call(d, 0)
}

function toObject(d) {
  var by = 'id'
    , o = {}

  return arguments.length == 1 
    ? (by = d, reduce)
    : reduce.apply(this, arguments)

  function reduce(p,v,i){
    if (i === 0) p = {}
    p[v[by]] = v
    return p
  }
}
},{}]},{},[1]);
