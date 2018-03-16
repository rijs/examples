const { server } = require('rijs')({ 
  port: 3000
, dir: __dirname 
, aliases: {  
    'app-hn': './resources/app-hn/app-hn.js'
  , 'hn-story': './resources/hn-story/hn-story.js'
  }
})