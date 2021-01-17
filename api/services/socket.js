const { io } = require('../app');

let userIDToSocket = new Map();

// Sends a match alert to the swipee
const sendMatchAlert = async(callID, swiper, swipee) => {
    const client = userIDToSocket.get(swipee);
    client.emit('match', {callID, swiper, swipee});
    console.log("Emitting match notif");
}


module.exports = {
    sendMatchAlert
}