import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from '../Routes'

import './App.css'

function App(props) {
  return (
    <div className="App">
      <Router>
        <Routes {...props} />
      </Router>
    </div>
  )
}

export default App
