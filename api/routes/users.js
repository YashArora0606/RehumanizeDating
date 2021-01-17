const queries = require('../database/queries')
const { updateUserProfile } = require('../services/updateProfile')
const express = require('express')
const router = express.Router()

const { FRONTEND_ADDRESS } = require('../config')

router.post('/login', async (req, res) => {
  console.log(req.body)
  console.log(FRONTEND_ADDRESS)
  const { email, displayName: name, photoURL } = req.body
  const profilePic = photoURL && photoURL.split('=s96')[0]
  const userData = await queries.getUserProfileFromEmail(email)
  if (userData === null) {
    const userID = await queries.createUser()
    const savedUserData = await updateUserProfile({
      userID,
      name,
      profilePic,
    })
    res.status(200).send({
      redirectUrl: `${FRONTEND_ADDRESS}/dashboard`,
      userData: savedUserData,
    })
  } else {
    res.status(200).send({
      redirectUrl: `${FRONTEND_ADDRESS}/dashboard`,
      userData,
    })
  }
  // RETURN THE USER ID TO THE USER
})

router.get('/profile', async (req, res) => {
  var { userID } = req.query
  console.log(userID)
  var response = await getUserProfile(userID)
  res.send(response)
})

router.put('/profile', async (req, res) => {
  var {
    userID,
    name,
    gender,
    genderPreference,
    bio,
    age,
    school,
    interests,
    profilePic,
  } = req.body
  var response = await updateUserProfile({
    userID,
    name,
    gender,
    genderPreference,
    bio,
    age,
    school,
    interests,
    profilePic,
  })
  res.send(response)
})

router.get('/candidates', async (req, res) => {
  var { userID, genderPref } = req.query
  console.log(userID, genderPref)
  var response = await getCandidateProfiles(userID, genderPref)
  res.send(response)
})

router.get('/swipesBy', (req, res) => {
  var { userID } = req.query
  console.log(userID)
  var response = await getSwipesOn(userID)
  res.send(response)
})

router.get('/swipesOn', (req, res) => {
  var { userID } = req.query
  console.log(userID)
  var response = await getSwipesBy(userID)
  res.send(response)
})

module.exports = router
