import React, { useState, useEffect } from 'react'

import { baseUrl } from 'config'



const Dashboard = props => {

  const [data, setData] = useState({})
  const [error, setError] = useState({})

  useEffect(() => {
    fetch(`${baseUrl}/dashboard`, { credentials: 'include' })
      .then(resp => resp.json())
      .then(json => {
        console.log(json)
        setData(json)
      })
      .catch(error => {
        console.log(error.message)
        setError(error)
      })
  }, [])

  return (
    <div>
      {data.success}
      {error.message}
    </div>
  )
}

export default Dashboard