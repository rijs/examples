module.exports = `
:host {
  left: 0;
  right: 0;
  box-sizing: border-box;
  display: block;
  padding: 14px;
  height: 52px;
  position: absolute;
  width: 100%;
  overflow: hidden;
  line-height: 24px; }

  :host > .title {
    max-width: calc(100% - 207px);
    text-overflow: ellipsis;
    white-space: pre;
    overflow: hidden;
    font-weight: 500;
    display: inline-block; }

  :host > .comments,
  :host > .score {
    transition: color 500ms;
    color: black;
    width: 114px;
    position: absolute;
    text-align: right;
    margin-left: 14px; }

  :host > .comments {
    right: 14px; }

  :host > .score {
    right: 128px; }

  :host > .comments::after {
    content: ' comments'; }

  :host > .score::after {
    content: ' points'; }

  :host(.score-changed) > .score {
    transition: color 500ms;
    font-weight: bold;
    color: green; }

  :host(.comments-changed) > .comments {
    transition: color 500ms;
    font-weight: bold;
    color: green; }
`

/*@keyframes fade-in {
  0% { 
    color: rgba(0,0,0,0);
    line-height: 0;
    height: 0;
    padding-top: 0;
    padding-bottom: 0;
    background: black
  }
  100% { 
    color: rgba(0,0,0,1);
    line-height: 100%;
    height: 52px;
    padding-top: 14px;
    padding-bottom: 14px;
    background: transparent;
  }
}
*/