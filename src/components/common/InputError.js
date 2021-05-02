import React from 'react'

const InputError = ({ message }) => {

  const renderDiv = () => {
    return <div className="text-danger">{message}</div>
  }

  return message ? renderDiv() : null
}

export default InputError