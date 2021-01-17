const express = require('express')
const router = express.Router()

const {processSwipe} = require('../services/swipeService');

router.post('/swipe', async (req, res) => {
  const { swiper, swipee, interested } = req.query

  let callObj = await processSwipe(swiper, swipee, interested);
 
  res.send(callObj);
})

module.exports = router
