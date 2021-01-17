const queries = require('../database/queries')
const { getSessionAndToken } = require('../services/openTok')
const express = require('express')
const router = express.Router()

router.get('/sessionAndToken', async (req, res) => {
  var { callID } = req.query
  var response = await getSessionAndToken(callID)
  res.send(response)
})

module.exports = router
