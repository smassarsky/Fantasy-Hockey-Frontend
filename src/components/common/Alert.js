import React, { Component } from 'react'
import { connect } from 'react-redux'

class Alert extends Component {

  render() {
    return (
      <div className={this.props.alert.type ? `mb-3 ${this.props.alert.type}` : ''}>{this.props.alert.message}</div>
    )
  }

}

const mapStateToProps = state => {
  return {
    alert: state.alert
  }
}

export default connect(mapStateToProps)(Alert)