const io = require('socket.io')(5000);

io.on('connection', function (socket) {
    socket.on('hello', function(name, fn) {
      // find if "name" exists
      fn("TESTE 222");
    });
  });