const express = require('express')
const router = express.Router()

router.post('/swipe', (req, res) => {
  res.send('POST swipe')
})

module.exports = router
