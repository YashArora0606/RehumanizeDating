// we must create a new CALL in the DB when people match

const { insertSwipe } = require('../database/queries');

const processSwipe = (swiper, swipee, interested) => {
    insertSwipe(swiper, swipee, interested, false);
    

}

module.exports = {
    processSwipe
}