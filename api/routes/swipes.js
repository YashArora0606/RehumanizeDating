const express = require('express')
const router = express.Router()

router.post('/swipe', (req, res) => {
  
  var {swiper, swipee, interested} = req.query;

  
  
  res.send('POST swipe')
})

module.exports = router
