import React, { useEffect, useState } from 'react'

import './index.css'

const SAMPLE_DATA = [
  {
    name: 'Oustan Ding',
    bio: 'i fucking hate css',
    age: 69,
    school: 'university of shit',
    interests: ['piano', 'tetris', 'csgo'],
    profilePicture:
      'https://lh3.googleusercontent.com/a-/AOh14GjG95TCQctGJ4pnLkDrI8I4YCLydEt3SA9B4Ml0yw',
  },
  {
    name: 'Armanya Dalmia',
    bio: 'kinky sex 7/7',
    age: 420,
    school: 'university of shit',
    interests: ['hentai', 'lit'],
  },
  {
    name: 'Yash Arora',
    bio: 'rose simp all day every day',
    age: 42069,
    school: 'university of shit',
    interests: ['rose'],
  },
  {
    name: 'Jonathan Cui',
    bio: 'brb calling grace',
    age: 4206942069,
    school: 'university of shit',
    interests: ['nodejs', 'battlecode', 'grace', 'wallstreetbets'],
  },
]

function Dashboard() {
  const [candidates, setCandidates] = useState(SAMPLE_DATA)
  const [index, setIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [preference, setPreference] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    window.localStorage.authenticated = true
  }, [])

  useEffect(() => {
    if (index === candidates.length - 1) {
      setNextIndex(0)
    } else {
      setNextIndex(index + 1)
    }
  }, [index])

  const handleSwipe = (isSwipeUp) => {
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

export default Dashboard
