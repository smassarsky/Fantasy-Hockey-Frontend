import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import { NavBar } from 'components/common'
import { Dashboard } from 'components/Dashboard'
import { MatchupIndex } from 'components/MatchupIndex'
import { MatchupShow } from 'components/MatchupShow'

class PrivateRoutesContainer extends Component {

  render() {
    return (
      <>
        <NavBar />
        <Switch>
          <Route exact path={'/dashboard'} component={Dashboard} />
          <Route exact path={'/matchups'} component={MatchupIndex} />
          <Route path={'/matchups/:matchupId'} component={MatchupShow} />
        </Switch>
      </>
    )
  }

}

export default PrivateRoutesContainer