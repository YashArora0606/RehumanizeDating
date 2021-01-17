import React, { useEffect } from 'react'
import { signInWithGoogle } from '../../firebase'

// import ''

function Landing() {
  useEffect(() => {
    window.localStorage.authenticated = false
  }, [])

  return (
    <>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-vcentered reverse-columns">
            <div
              className="column
              is-10-mobile is-offset-1-mobile
              is-10-tablet is-offset-1-tablet
              is-5-desktop is-offset-1-desktop
              is-5-widescreen is-offset-1-widescreen
              is-5-fullhd is-offset-1-fullhd"
              data-aos="fade-down"
            >
              <h1 className="title titled is-1 mb-6">joya</h1>
              <h2 className="subtitled subtitle has-text-grey is-4 has-text-weight-normal is-family-sans-serif">
                r e h u m a n i z e &nbsp;&nbsp; d a t i n g.
              </h2>
              <div className="buttons">
                <button className="button is-black" onClick={signInWithGoogle}>
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
