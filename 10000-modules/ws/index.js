var app = require('express')()
  , static = require('serve-static')
  , server = app.listen(3000)
  , rijs = require('rijs').default({ server })

app.use(static(__dirname))
