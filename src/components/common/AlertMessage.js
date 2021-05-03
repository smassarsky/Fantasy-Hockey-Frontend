import React from 'react'

const AlertMessage = ({ type, message }) => {
  
  const renderMessage = () => {
    return (
      <div className={'mb-3' + type === 'success' ? 'text-success' : 'text-danger'}>
        {message}
      </div>
    )
  }

  return message ? renderMessage() : null
}

export default AlertMessage