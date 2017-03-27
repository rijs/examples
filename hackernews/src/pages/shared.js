const clients = []
    , 
onconnect = function(e) {
  console.log("shared start", e)
  var port = e.ports[0]

  port.onmessage = function(e) {
    console.log("shared message", e)
    // var workerResult = 'Result: ' + (e.data[0] * e.data[1])
    port.postMessage({ type: 'ack', value: e })
  }
}