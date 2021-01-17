const { io } = require('../app');

let userIDToSocket = new Map();

io.on('connection', (socket) => {
  const handshakeData = socket.request;
  const userID = handshakeData._query['userID']
  console.log("Socket connect userID:", userID);

  userIDToSocket.set(userID, socket);
  
  socket.on('disconnect', () => {
    userIDToSocket.delete(userID);
    console.log("Socket disconnect userID:", userID);
  });
});

// Sends a match alert to the swipee
const sendMatchAlert = async(callID, swiper, swipee) => {
    const client = userIDToSocket.get(swipee);
    client.emit('match', {callID, swiper, swipee});
    console.log("Emitting match notif");
}


module.exports = {
    sendMatchAlert
}