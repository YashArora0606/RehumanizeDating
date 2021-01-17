const config = require('../config');
const { getCall, updateSessionID } = require('../database/queries');
const apiKey = config.API_KEY;
const apiSecret = config.API_SECRET;

var OpenTok = require('opentok'),
opentok = new OpenTok(apiKey, apiSecret);


// THIS FUNCTION MAY BE PROBLEMATIC -- check for bugs starting here
// creates a session and stores it in the associated call on DB
const createSession = async (callID) => {
    await opentok.createSession(async (err, session) => {
        if (err) return console.log(err);
        await updateSessionID(callID, session.sessionId);
        return;
    });
}

// Generate a Token from just a sessionId
const generateToken = (sessionId) => {
    opentok.generateToken(sessionId);
}

// callID must exist in the DB already
// creates a session for the call if the call didn't already have one
const getSessionAndToken = async (callID) => {
    var call = await getCall(callID);
    var token;
    // session already exists
    if (call.SessionID != null && call.SessionID.length > 0){
        token = generateToken(call.SessionID);
        return {sessionID: call.SessionID, token: token};
    } else {
    //session doesn't exist
        await createSession(callID);
        call = await getCall(callID);
        if (call.SessionID != null && call.SessionID.length > 0){
            token = generateToken(call.SessionID);
            return {sessionID: call.SessionID, token: token};
        } else {
            console.error("Unable to create new session and token");
            return {sessionID: null, token: null};
        }
    }
}

// TO FORCE A DISCONNECT WHEN TIMER ENDS https://tokbox.com/developer/rest/#forceDisconnect


module.exports = {
    getSessionAndToken
}