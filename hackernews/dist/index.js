'use strict';

var _require = require('rijs')({ port: 3000, dir: __dirname }),
    server = _require.server;

// *************************************************************
// var WebSocketServer = require('uws').Server;
// var wss = new WebSocketServer({ server });

// function onMessage(message) {
//     console.log('received: ', message, this);
// }

// wss.on('connection', function(ws) {
//     ws.on('message', onMessage);
//     ws.send('something');
// });