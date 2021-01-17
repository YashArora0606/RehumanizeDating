import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase'

import CONFIG, { FIREBASE_CONFIG } from './config'
const { BACKEND_ADDRESS, FRONTEND_ADDRESS } = CONFIG

firebase.initializeApp(FIREBASE_CONFIG)

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const signInWithGoogle = async () => {
  const response = await auth.signInWithPopup(provider)
  const userData = response.user
  window.localStorage.authenticated = true
  const loginResponse = await axios({
    method: 'post',
    url: `${BACKEND_ADDRESS}/users/login`,
    data: userData,
  })
  console.log(loginResponse.data)
  const { redirectUrl, userData: retrievedUserData } = loginResponse.data

  window.localStorage.userData = JSON.stringify(retrievedUserData)
  window.localStorage.setItem('userID', retrievedUserData.userID)
  window.location.href = redirectUrl
}

export { auth, signInWithGoogle }
