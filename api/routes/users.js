const queries = require('../database/queries');

const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  queries.createUser()
  res.send('login');
})

router.post('/login', (req, res) => {
  console.log(req.body)
  res.send('login')
})

router.get('/profile', (req, res) => {
  res.send('GET profile')
})

router.put('/profile', (req, res) => {
  res.send('PUT profile')
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
