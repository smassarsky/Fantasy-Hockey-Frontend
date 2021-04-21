import React, { Component } from 'react'
import { connect } from 'react-redux'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Alert, InputError } from 'components/common'

import { userActions } from 'actions/userActions'
import { validateSignup } from 'validators/signupValidators'

class Signup extends Component {

  state = {
    username: '',
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {}
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const errors = validateSignup(this.state)
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      this.props.signup(this.state)
    }
  }

  render() {
    return(
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
            <Form.Label srOnly="true">Name</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
            />
            <InputError message={this.state.errors.name} />
          </Form.Group>

          <Form.Group>
            <Form.Label srOnly="true">Email</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
            />
            <InputError message={this.state.errors.email} />
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

          <Form.Group>
            <Form.Label srOnly="true">Password Confirmation</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="password"
              name="passwordConfirmation"
              placeholder="Password Confirmation"
              value={this.state.passwordConfirmation}
            />
            <InputError message={this.state.errors.passwordConfirmation} />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
          >
            Signup
          </Button>
          
        </Form>
      </div>
    )
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