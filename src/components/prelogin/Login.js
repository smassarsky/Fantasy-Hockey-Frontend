import React, { Component } from 'react'
import { connect } from 'react-redux'

import { userActions } from 'actions/userActions'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Alert, InputError } from 'components/common'

class Login extends Component {

  constructor(props) {
    super(props)

    this.props.logout()

    this.state = {
      username: '',
      password: '',
      errors: {}
    }
  }

  render() {
    return (
      <>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggingIn: state.user.loggingIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(userActions.login(username, password)),
    logout: () => dispatch(userActions.logout)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)