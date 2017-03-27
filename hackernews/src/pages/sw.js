console.log("sw")

self.addEventListener('install', function(event) {
  // Perform install steps
  console.log("1", 1)
  console.log("install", WebSocket, WebWorker, event)
});