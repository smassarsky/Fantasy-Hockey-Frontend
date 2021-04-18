import React, { Component } from 'react'

class InputError extends Component {

  renderDiv() {
    return <div className="text-danger">{this.props.message}</div>
  }

  render() {
    return (
      <>
        { this.props.message ? this.renderDiv() : null }
      </>
    )
  }

}

export default InputError