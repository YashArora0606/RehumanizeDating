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
    console.log('asdf')
    console.log(savedUserData)
    res.status(200).send({
      redirectUrl: `${FRONTEND_ADDRESS}/dashboard`,
      userData: savedUserData,
    })
  } else {
    console.log(userData)
    res.status(200).send({
      redirectUrl: `${FRONTEND_ADDRESS}/dashboard`,
      userData,
    })
  }
  return
  // RETURN THE USER ID TO THE USER
})

router.get('/profile', async (req, res) => {
  var { userID } = req.query
  console.log(userID)
  var response = await queries.getUserProfile(userID)
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
  var response = await queries.getCandidateProfiles(userID, genderPref)
  res.send(response)
})

router.get('/swipesBy', async (req, res) => {
  var { userID } = req.query
  console.log(userID)
  var response = await queries.getSwipesOn(userID)
  res.send(response)
})

router.get('/swipesOn', async (req, res) => {
  var { userID } = req.query
  console.log(userID)
  var response = await queries.getSwipesBy(userID)
  res.send(response)
})

module.exports = router
