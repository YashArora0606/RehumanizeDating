const config = require('../config')
const { getCall, updateSessionID } = require('../database/queries')
const apiKey = config.API_KEY
const apiSecret = config.API_SECRET

console.log('API KEY AND SECRET: ')
console.log(apiKey)
console.log(apiSecret)

var OpenTok = require('opentok'),
  opentok = new OpenTok(apiKey, apiSecret)

// THIS FUNCTION MAY BE PROBLEMATIC -- check for bugs starting here
// creates a session and stores it in the associated call on DB
const createSessionWithToken = (callID, resolve, reject) => {
  console.log('** Creating session')
  opentok.createSession(async (err, session) => {
    console.log('** Create session callback: ', session)
    if (err) return console.log(err)
    
    let sessionID = session.sessionId;
    await updateSessionID(callID, sessionID);

    if (sessionID != null && sessionID.length > 0) {
        token = generateToken(sessionID)
        resolve({ sessionID: sessionID, token: token })
    } else {
        console.error('Unable to create new session and token')
        reject({ sessionID: null, token: null })
    }

    console.log('** Create session callback done')
    return
  })
}

// Generate a Token from just a sessionId
const generateToken = (sessionId) => {
  opentok.generateToken(sessionId)
}

// callID must exist in the DB already
// creates a session for the call if the call didn't already have one
const getSessionAndToken = async (callID) => {
  var call = await getCall(callID)
  var token
  // session already exists
  if (call.sessionID != null && call.sessionID.length > 0) {
    token = generateToken(call.sessionID)
    return { sessionID: call.sessionID, token: token }
  } else {
    //session doesn't exist
    sessionAndTokenPromise = new Promise((resolve, reject) => {
      createSessionWithToken(callID, resolve, reject);
    })

    const sessionAndToken = await sessionAndTokenPromise
    return sessionAndToken
  }
}

const createSession = (callID) => {
    opentok.createSession(async (err, session) => {
        if (err) return console.log(err)
        await updateSessionID(callID, sessionID);
    })
}

// TO FORCE A DISCONNECT WHEN TIMER ENDS https://tokbox.com/developer/rest/#forceDisconnect

module.exports = {
  getSessionAndToken,
  createSession,
}
