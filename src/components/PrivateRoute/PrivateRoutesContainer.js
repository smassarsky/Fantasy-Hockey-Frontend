import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import { NavBar } from 'components/common'
import { Dashboard } from 'components/Dashboard'

class PrivateRoutesContainer extends Component {

  render() {
    return (
      <>
        <NavBar />
        <Switch>
          <Route exact path={'/dashboard'} component={Dashboard} />
        </Switch>
      </>
    )
  }

}

export default PrivateRoutesContainer