var app = require('express')()
  , static = require('serve-static')

app
  .use(static(__dirname))
  .listen(2000, d => console.log("listening 2000"))