import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Landing from './components/Landing'
import VideoChat from './components/VideoChat'

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/video" component={VideoChat} />

    </Switch>
  )
}

export default Routes
