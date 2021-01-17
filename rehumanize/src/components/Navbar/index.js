import './index.css'
import React, { useEffect, useState } from 'react'

import CONFIG from '../../config'
const { FRONTEND_ADDRESS } = CONFIG

function Navbar() {
  const { authenticated } = window.localStorage
  const [showLinks, setShowLinks] = useState(false)

  useEffect(() => {
    setShowLinks(JSON.parse(authenticated))
  }, [authenticated])

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href={FRONTEND_ADDRESS}>
          <h3>💖</h3>
        </a>
      </div>

      {showLinks && (
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
