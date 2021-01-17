import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Routes from '../Routes'

import './App.css'

function App(props) {
  return (
    <div className="App">
      <section className="hero is-white is-fullheight">
        <Navbar />

        <Router>
          <Routes {...props} />
        </Router>
      </section>
    </div>
  )
}

export default App
