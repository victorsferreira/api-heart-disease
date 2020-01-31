const io = require('socket.io-client');
const socket = io('http://localhost:5000', { transports: ['websocket']} );

socket.on('connect', () => {
  console.log(socket.id, socket.connected);

  console.log("ENTROU AQUI")
  socket.emit("hello", 'CARALH XXXO', (data) => {
    console.log(">>>>", data)
  });
});