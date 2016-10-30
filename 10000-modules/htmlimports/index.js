const fs = require('fs')
    , app = require('express')()
    , static = require('serve-static')
    , options = {
        key: fs.readFileSync('./server.key')
      , cert: fs.readFileSync('./server.crt')
      }
    , server = require('spdy').createServer(options, app).listen(2000, d => console.log("listening 2000"))

app.use(static(__dirname))