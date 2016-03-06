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
    return str(ripple.resources[d.name].body.log[d.index].value.toJS());
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