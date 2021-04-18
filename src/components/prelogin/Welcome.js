import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Welcome extends Component {

  render() {
    return (
      <div className='h-100 login-styling'>
        <div className='m-auto text-center'>
          <h2>Welcome to the Fantasy Hockey Project!</h2>
          <h3>Please <Link to='/login' >Login</Link> or <Link to='/signup'>Signup</Link></h3>
        </div>
      </div>
    )
  }

}

export default Welcome