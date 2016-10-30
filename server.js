var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
   console.log((new Date()) + ' Received request for ' + request.url);
   response.writeHead(404);
   response.end();
});

server.listen(8080, function() {
        console.log((new Date()) + ' Server is listening on port 8080');
});

var SerialPort = require('serialport');

var wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptCOnnections: true
});

function originIsAllowed(origin) { 
  return true;
}

if (process.argv.length !== 3) {
  console.error('Usage:  node server.js comport');
}

var listeners = [];

if (process.argv[2] === 'emulator') {
  setInterval(function() {
    listeners.forEach(function(listener) {
      listener.send(JSON.stringify([Math.floor(Math.random() * 1023),
                    Math.floor(Math.random() * 1023),
                    Math.floor(Math.random() * 1023)]));
    });
  }, 160);
} else {
  var port = new SerialPort(process.argv[2], {
        parser: SerialPort.parsers.readline('\n'),
        autoOpen: true,
        baudRate: 115200
    },
    function (err) {
       if (err) {
         return console.log('Error', err.message);
         process.exit();
       }
  });

  port.on('data', function(data) {
     //console.log('incoming!', JSON.stringify(data));
     // split into three readings
     console.log('data incoming', data);
     var readings = data.split(',').map(function(d) { return parseInt(d); });
     listeners.forEach(function(listener) {
        listener.send(JSON.stringify(readings));
     });
  });
}

wsServer.on('request', function(request) {
    console.log('request received', request.resource);
    if (!originIsAllowed(request.origin)) {
      request.reject();
      console.log('origin not allowed rejected', request.resource);
      return;
    }

    try {
      var conn = request.accept('', request.origin);
    } catch (e) {
        console.log('request connect attempt failed', e);
        return;
    }

    listeners.push(conn);

    conn.on('error', function(e) {
      console.log('error in socket', e);
    });

    conn.on('close', function() {
      listeners.forEach((candidate) => {
        if (candidate === conn) {
          listeners.pop(conn);
        }
    });
  });
});
