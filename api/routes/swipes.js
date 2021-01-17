const express = require('express')
const router = express.Router()

const { getSwipedOn, insertSwipe } = require('../database/queries')

router.post('/swipe', async (req, res) => {
  const { swiper, swipee, interested } = req.query

  const usersSwipedOn = await getSwipedOn(swiper)
  const wasSwiped = usersSwipedOn !== null && usersSwipedOn.includes(swipee)
  const scheduled = interested && wasSwiped
  const insertedSwipe = await insertSwipe(swiper, swipee, interested, scheduled)

  res.send(insertedSwipe)
})

module.exports = router
