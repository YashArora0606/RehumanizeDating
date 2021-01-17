import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import VideoChat from './components/VideoChat'
import Profile from './components/Profile'

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/chat" component={VideoChat} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  )
}

export default Routes
