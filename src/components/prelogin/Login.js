import React, { Component } from 'react'
import { connect } from 'react-redux'

import { userActions } from 'actions'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Alert, InputError } from 'components/common'
import { validateLogin } from 'validators'

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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const errors = validateLogin(this.state)
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      this.props.login(this.state.username, this.state.password)
    }
  }

  render() {
    return (
      <div className="h-100 login-styling">
        <Form onSubmit={this.handleSubmit} className="form-signin text-center">
          <h3 className="mb-3 font-weight-normal">Login</h3>

          <Alert />

          <Form.Group>
            <Form.Label srOnly="true">Username</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
            />
            <InputError message={this.state.errors.username} />
          </Form.Group>

          <Form.Group>
            <Form.Label srOnly="true">Password</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
            />
            <InputError message={this.state.errors.password} />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
          >
            Login
          </Button>
          
        </Form>
      </div>
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