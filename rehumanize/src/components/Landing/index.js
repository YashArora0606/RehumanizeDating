import React from 'react'

function Landing() {
  return (
    <>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            />
          </a>
        </div>

        <div class="navbar-menu">
          <div class="navbar-end">
            <a class="navbar-item">WHY?</a>

            <a class="navbar-item">BUY</a>

            <a class="navbar-item">ILLUSTRATION SERIES</a>

            <a class="navbar-item">EXCLUSIVE ILLUSTRATIONS</a>
          </div>
        </div>
      </nav>
      <section class="hero is-white is-fullheight">
        <div class="hero-body">
          <div class="container">
            <div class="columns  is-vcentered reverse-columns">
              <div
                class="column
              is-10-mobile is-offset-1-mobile
              is-10-tablet is-offset-1-tablet
              is-5-desktop is-offset-1-desktop
              is-5-widescreen is-offset-1-widescreen
              is-5-fullhd is-offset-1-fullhd"
                data-aos="fade-down"
              >
                <h1 class="title titled is-1 mb-6">
                  absurd illustrations that make sense
                </h1>
                <h2 class=" subtitled subtitle has-text-grey is-4 has-text-weight-normal is-family-sans-serif">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Laborum cupiditate dolorum vitae dolores nesciunt totam magni
                  quas.
                </h2>
                <div class="buttons">
                  <button class="button is-black">Download</button>
                  <button class="button">Subscribe</button>
                </div>
              </div>
              <div
                data-aos="fade-right"
                class="column
              is-10-mobile is-offset-1-mobile
              is-10-tablet is-offset-1-tablet
              is-4-desktop is-offset-1-desktop
              is-4-widescreen is-offset-1-widescreen
              is-4-fullhd is-offset-1-fullhd"
              >
                <figure class="image is-square">
                  <img src="../images/undraw_Camera_re_cnp4.svg" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="hero is-white is-fullheight">
        <div class="hero-body">
          <div class="container">
            <div class="columns  is-vcentered">
              <div
                data-aos="fade-left"
                class="column
              is-10-mobile is-offset-1-mobile
              is-10-tablet is-offset-1-tablet
              is-4-desktop is-offset-1-desktop
              is-4-widescreen is-offset-1-widescreen
              is-4-fullhd is-offset-1-fullhd"
              >
                <figure class="image is-square">
                  <img src="../images/undraw_Camera_re_cnp4.svg" />
                </figure>
              </div>
              <div
                data-aos="fade-down"
                class="column
              is-10-mobile is-offset-1-mobile
              is-10-tablet is-offset-1-tablet
              is-5-desktop is-offset-1-desktop
              is-5-widescreen is-offset-1-widescreen
              is-5-fullhd is-offset-1-fullhd"
              >
                <h1 class="titled title is-1 mb-6">
                  absurd illustrations that make sense
                </h1>
                <h2 class="subtitled subtitle">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Laborum cupiditate dolorum vitae dolores nesciunt totam magni
                  quas.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="hero is-white is-fullheight">
        <div class="hero-body">
          <div class="container">
            <div class="columns  is-vcentered reverse-columns">
              <div
                data-aos="fade-right"
                class="column
              is-10-mobile is-offset-1-mobile
              is-10-tablet is-offset-1-tablet
              is-5-desktop is-offset-1-desktop
              is-5-widescreen is-offset-1-widescreen
              is-5-fullhd is-offset-1-fullhd"
              >
                <h1 class="title titled is-1 mb-6">
                  absurd illustrations that make sense
                </h1>
                <h2 class="subtitle subtitled">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Laborum cupiditate dolorum vitae dolores nesciunt totam magni
                  quas.
                </h2>
              </div>
              <div
                data-aos="fade-down"
                class="column
              is-10-mobile is-offset-1-mobile
              is-10-tablet is-offset-1-tablet
              is-4-desktop is-offset-1-desktop
              is-4-widescreen is-offset-1-widescreen
              is-4-fullhd is-offset-1-fullhd"
                data-aos="fade-up"
              >
                <figure class="image is-square">
                  <img src="../images/undraw_Camera_re_cnp4.svg" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="hero is-medium has-text-centered">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-centered">
              <div data-aos="zoom-in-up" class="column is-8">
                <h1 class="title titled is-1 mb-6">
                  Primary bold title <span id="typewriter"></span>
                </h1>
                <h2 class="subtitle subtitled">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Laborum cupiditate dolorum vitae dolores nesciunt totam magni
                  quas. Lorem ipsum, dolor sit amet consectetur adipisicing
                  elit.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Landing
