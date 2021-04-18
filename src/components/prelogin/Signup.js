import React, { Component } from 'react'
import { connect } from 'react-redux'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Alert, InputError } from '../common'

import { userActions } from 'actions/userActions'
import { validateSignup } from '../validators/signupValidators'

class Signup extends Component {

  render() {

  }

}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)