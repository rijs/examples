const ReactDOM = require('react-dom/umd/react-dom.production.min.js')
    , React = require('react/umd/react.production.min.js')
    , world = require('./some-local-file.js')

class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

ReactDOM.render(
  React.createElement(Hello, { toWhat: world }, null),
  document.body
);