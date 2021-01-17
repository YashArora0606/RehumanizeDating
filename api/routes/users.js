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
})

router.get('/profile', (req, res) => {
  var { userID } = req.query
  console.log(userID)
  var response = await getUserProfile(userID)
  res.send(response)
})

router.put('/profile', async (req, res) => {
  var { userID, name, gender, genderPreference, bio, age, school, interests, profilePic } = req.body
  var response = await updateUserProfile(
    userID,
    name,
    gender,
    genderPreference,
    bio,
    age,
    school,
    interests,
    profilePic,
  )
  res.send(response)
})

router.get('/candidates', (req, res) => {
  var { userID, genderPreference } = req.query
  console.log(userID, genderPreference)
  var response = await getCandidateProfiles(userID, genderPreference)
  res.send(response)
})

router.get('/swipedBy', (req, res) => {
  res.send('GET swipedBy')
})

router.get('/swipedOn', (req, res) => {
  res.send('GET swipedOn')
})

module.exports = router
