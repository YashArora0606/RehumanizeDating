const queries = require('../database/queries')
const { updateUserProfile } = require('../services/updateProfile')
const express = require('express')
const router = express.Router()

const { FRONTEND_ADDRESS } = require('../config')

router.post('/login', (req, res) => {
  console.log(req.body)
  console.log(FRONTEND_ADDRESS)
  res.status(200).send({
    redirectUrl: `${FRONTEND_ADDRESS}/dashboard`,
  })

  // RETURN THE USER ID TO THE USER
})

router.get('/profile', (req, res) => {
  res.send('GET profile')
})

router.put('/profile', async (req, res) => {
  var { userID, name, bio, age, school, interests, profilePic } = req.query
  var response = await updateUserProfile(
    userID,
    name,
    bio,
    age,
    school,
    interests,
    profilePic,
  )
  res.send(response)
})

router.get('/candidates', (req, res) => {
  res.send('GET candidates')
})

router.get('/swipedBy', (req, res) => {
  res.send('GET swipedBy')
})

router.get('/swipedOn', (req, res) => {
  res.send('GET swipedOn')
})

module.exports = router
