import './index.css'
import React from 'react'

import CONFIG from '../../config'
const { FRONTEND_ADDRESS } = CONFIG

function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href={FRONTEND_ADDRESS}>
          <h3>💖</h3>
        </a>
      </div>

      {JSON.parse(window.localStorage.authenticated) && (
        <div className="navbar-menu">
          <div className="navbar-end">
            <a className="navbar-item" href={`${FRONTEND_ADDRESS}/dashboard`}>
              DASHBOARD
            </a>
            <a className="navbar-item" href={`${FRONTEND_ADDRESS}/chat`}>
              CHAT
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
