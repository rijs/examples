'use strict';

importScripts('/socket.io/socket.io.js');

clients = [];
server = io();

server.emit('change', { name: 'app-hn', type: 'pull' });
server.on('change', function (change) {

  // console.log("change", change)
  broadcast('sth');
});

function broadcast(change) {
  clients.map(function (client) {
    return send(client, change);
  });
}

/*new WebSocket((location.protocol == 'https:' ? 'wss://' : 'ws://') + location.host)


server.onopen = function (event) {
  console.log('open', event)
  server.send("Here's some text that the server is urgently awaiting!") 
}

server.onmessage = function (event) {
  console.log('message', event)
}*/

// throw 'sth'
onconnect = function onconnect(e) {
  console.log("shared start", e);
  var port = e.ports[0];
  clients.push(port);
  port.onmessage = function (e) {
    // var workerResult = 'Result: ' + (e.data[0] * e.data[1])
    // port.postMessage(Object.keys(caches))
    port.postMessage(self.location.protocol);
  };
};

function send(client, change) {
  client.postMessage(change);
}