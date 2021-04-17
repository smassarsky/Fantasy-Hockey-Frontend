import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'

import { history } from './helpers/history'


import './App.css';

class App extends Component {

  constructor(props) {
    super(props)

    history.listen((location, actions) =>{
      this.props.clearAlerts()
    })
  }

  render() {
    return (
      <div className="App h-100">
        <Router history={history} >
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <PrivateRoute path='/' component={PrivateRoutesContainer} />
          </Switch>
        </Router>
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return {
    clearAlerts: () => dispatch(alertActions.clear())
  }
}

export default connect(null, mapDispatchToProps)(App)