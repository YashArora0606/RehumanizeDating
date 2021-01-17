// we must create a new CALL in the DB when people match

const { insertSwipe, createCall, getSwipesBy } = require('../database/queries');
const {sendMatchAlert} = require('./io');
const { createSession } = require('./openTok');

const processSwipe = async (swiper, swipee, interested) => {
    const usersSwipedBy = await getSwipesBy(swiper);

    // Whether or not the current swiper has the interset of the current swipee
    const wasSwipedInterested = usersSwipedBy !== null && usersSwipedBy.filter((value, ind, array) => {return value.swipee == swiper && value.interested == true}).length > 0;
  
    // Should we schedule a call?
    const scheduled = interested && wasSwipedInterested
    const insertedSwipe = await insertSwipe(swiper, swipee, interested, scheduled)
  
  
    // Returns a call object if the swipe resulted in a match, null otherwise
    let callObj = null;
    if (scheduled === true){
        callObj = await createCall(false, swiper, swipee, '', '', '');
        createSession(callObj.id);
        sendMatchAlert(callObj.id, swiper, swipee);
    }    
    return callObj
}

module.exports = {
    processSwipe
}