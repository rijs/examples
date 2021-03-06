module.exports = `
:host {
  display: block;
  position: absolute;
  top: 50px;
  left: 0%;
  right: 0%;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  background-color: rgb(246, 246, 239); }

  :host(.is-loading)::before {
    content: 'loading..'; 
    width: 100%;
    position: absolute;
    text-align: center;
    padding: 50px 0; }

  :host > h1 {
    margin: 0;
    margin-top: -50px;
    position: absolute;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-weight: 100;
    text-align: center;
    z-index: 10;
    background-color: rgb(255, 102, 0); }

  :host > hn-story {
    position: absolute;
    transition: top 500ms;
    left: 0; 
    top: 0; }
  `