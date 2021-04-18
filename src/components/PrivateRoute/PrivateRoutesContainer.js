import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from '../common/NavBar'

class PrivateRoutesContainer extends Component {

  render() {
    return (
      <>
        <Navbar />
        <Switch>
          {/* <Route exact path={'/dashboard'} component={Dashboard} /> */}
        </Switch>
      </>
    )
  }

}

export default PrivateRoutesContainer