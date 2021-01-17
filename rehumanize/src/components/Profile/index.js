import './index.css'
import React, { useState } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'

import CONFIG from '../../config'
const { BACKEND_ADDRESS, FRONTEND_ADDRESS } = CONFIG

function Profile({ history }) {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [age, setAge] = useState('')
  const [school, setSchool] = useState('')
  const [interests, setInterests] = useState('')

  const handleChange = (event, field) => {
    switch (field) {
      case 'name':
        setName(event.target.value)
        return
      case 'bio':
        setBio(event.target.value)
        return
      case 'age':
        setAge(event.target.value)
        return
      case 'school':
        setSchool(event.target.value)
        return
      case 'interests':
        setInterests(event.target.value)
        return
    }
  }

  const handleSubmit = async (event) => {
    try {
      const profileData = {
        name,
        bio,
        age: parseInt(age, 10),
        school,
        interests: interests.split(','),
      }
      await axios({
        method: 'put',
        url: `${BACKEND_ADDRESS}/users/profile`,
        data: profileData,
      })
      history.push('/dashboard')
    } catch (err) {
      history.push('/dashboard')
    }
  }

  return (
    <div className="hero-body">
      <div className="container">
        <div className="columns is-vcentered reverse-columns">
          <div className="profileContainer">
            <h1 className="profileTitle">My profile</h1>
            <div className="profileRow">
              <h4>name</h4>
              <input
                name="name"
                onChange={(event) => handleChange(event, 'name')}
              />
            </div>
            <div className="profileRow">
              <h4>bio</h4>
              <input
                name="bio"
                onChange={(event) => handleChange(event, 'bio')}
              />
            </div>
            <div className="profileRow">
              <h4>age</h4>
              <input
                name="age"
                onChange={(event) => handleChange(event, 'age')}
              />
            </div>
            <div className="profileRow">
              <h4>school</h4>
              <input
                name="school"
                onChange={(event) => handleChange(event, 'school')}
              />
            </div>
            <div className="profileRow">
              <h4>interests</h4>
              <input
                name="interests"
                onChange={(event) => handleChange(event, 'interests')}
              />
            </div>
            <button className="submitButton" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Profile)
