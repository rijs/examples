var app        = require('express')()
  , compress   = require('compression')()
  , server     = app.use(compress).listen(4000)
  , ripple     = require('rijs').default({ server })
  , serve      = require('serve-static')
  , { router } = require('decouter')
  , { routes } = ripple('routes')
  , root       = __dirname
  
app
  .use(serve(__dirname+'/public'))
  .use(router(routes))  
  .get('/*', (req, res) => res.sendFile('index.html', { root }))