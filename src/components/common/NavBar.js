import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import { userActions } from 'actions/userActions'

class NavigationBar extends Component {

  handleLogout = (e) => {
    this.props.logout()
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <LinkContainer to='/dashboard'>
          <Navbar.Brand >Dashboard</Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="mr-auto">
            <LinkContainer to='/matchups'>
              <Nav.Link>Matchups</Nav.Link> 
            </LinkContainer>
          </Nav>
          <Nav>
            <Navbar.Text className="mr-3">Hi, {this.props.username}</Navbar.Text>
            <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(userActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)