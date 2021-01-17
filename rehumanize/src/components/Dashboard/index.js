import './index.css'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'
import CONFIG from '../../config'
const { BACKEND_ADDRESS, FRONTEND_ADDRESS, CHAT } = CONFIG
import './index.css'
import io from "socket.io-client";


// const SAMPLE_DATA = [
//   {
//     id: '007e199a-9646-4730-98fa-633032169758',
//     name: 'Oustan Ding',
//     bio: 'css is difficult',
//     age: 69,
//     school: 'university of waterloo',
//     interests: ['piano', 'tetris', 'csgo'],
//     profilePicture:
//       'https://lh3.googleusercontent.com/a-/AOh14GjG95TCQctGJ4pnLkDrI8I4YCLydEt3SA9B4Ml0yw',
//   },
//   {
//     id: '0384ea4b-27b3-4a7d-8bbb-329180da8e8e',
//     name: 'Armanya Dalmia',
//     bio: 'bae suzy',
//     age: 420,
//     school: 'university of waterloo',
//     interests: ['sana', 'lit'],
//   },
//   {
//     id: '3a5b3629-2c4a-47e6-8d0e-1f54794c9ff8',
//     name: 'Yash Arora',
//     bio: 'rose fan all day every day',
//     age: 42069,
//     school: 'university of waterloo',
//     interests: ['rose'],
//   },
//   {
//     id: '421ddb0a-2b78-4ad1-863d-a4dbbf95a057',
//     name: 'Jonathan Cui',
//     bio: 'brb calling grace',
//     age: 4206942069,
//     school: 'university of waterloo',
//     interests: ['nodejs', 'battlecode', 'grace', 'wallstreetbets'],
//   },
// ]

function Dashboard() {
  const [candidates, setCandidates] = useState(SAMPLE_DATA)
  const [index, setIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [preference, setPreference] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    window.localStorage.authenticated = true;
    
    const socket = io.connect(BACKEND_ADDRESS, {query: `userID=${window.localStorage.getItem('userID')}`});
    socket.on("match", data => {
      let {callID, swiper, swipee} = data;
      window.location.href = FRONTEND_ADDRESS + "/chat/" + callID; 
    });

    const getCandidates = async () => {
      const { userID, genderPreference } = window.localStorage.userData
      const response = await axios({
        method: 'get',
        url: `${BACKEND_ADDRESS}/users/candidates?userID=${userID}&genderPref=${genderPreference}`,
      })
      const candidates = response.data
      setCandidates(candidates)
    }

    getCandidates()
  }, [])

  useEffect(() => {
    if (index === candidates.length - 1) {
      setNextIndex(0)
    } else {
      setNextIndex(index + 1)
    }
  }, [index])

  const handleSwipe = (isSwipeUp) => {
    // Send swipe information to the backend
    const swipeResponse = await axios({
      method: 'post',
      url: `${BACKEND_ADDRESS}/swipes/swipe`,
      data: {
        swiper : window.localStorage.getItem('userID'),
        swipee : candidates[index].id,
        interested : isSwipeUp
      }
    })

    const callObject = swipeResponse.data;
    if (callObject !== null){
      window.location.href = FRONTEND_ADDRESS + "/chat/" + callObject.id; 
    }

    setPreference(isSwipeUp ? 'up' : 'down')
    setTimeout(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setIndex((index) => (index === candidates.length - 1 ? 0 : index + 1))
        setIsTransitioning(false)
        setPreference(null)
      }, 500)
    }, 100)
  }

  return (
    <div className="hero-body">
      <div className="container">
        <div className="columns is-vcentered reverse-columns">
          <div className="innerDashboardContainer">
            <div className="swipeContainer smallContainer">
              <i
                className="fas fa-caret-up fa-3x"
                onClick={() => handleSwipe(true)}
              />
              <i
                className="fas fa-caret-down fa-3x"
                onClick={() => handleSwipe(false)}
              />
            </div>
            <div className="candidateContainer">
              <div className="nextCandidate profilePictureContainer">
                <div className="smallContainer">
                  <img
                    className="profilePicture"
                    src={candidates[nextIndex].profilePicture}
                  />
                </div>
                <div className="smallContainer info">
                  <h1>{candidates[nextIndex].name}</h1>
                  <p className="bio">{candidates[nextIndex].bio}</p>
                  <p>🎂 {candidates[nextIndex].age}</p>
                  <p>🎓 {candidates[nextIndex].school}</p>
                  <p>💗 {candidates[nextIndex].interests.join(', ')}</p>
                </div>
              </div>
              <div
                className={`currentCandidate  ${
                  isTransitioning && 'transparent'
                }`}
              >
                <div className="smallContainer profilePictureContainer">
                  <img
                    className="profilePicture"
                    src={candidates[index].profilePicture}
                  />
                </div>
                <div className="smallContainer info">
                  <h1
                    className={`${preference === 'up' && 'green'} ${
                      preference === 'down' && 'red'
                    }`}
                  >
                    {candidates[index].name}
                  </h1>
                  <p className="bio">{candidates[index].bio}</p>
                  <p>🎂 {candidates[index].age}</p>
                  <p>🎓 {candidates[index].school}</p>
                  <p>💗 {candidates[index].interests.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Dashboard)
