import React from 'react'

const MatchupsTable = ({ matchups }) => {

  const renderTable = () => {
    
  }

  return (
    <>
      {
        matchups.length > 0
          ? renderTable()
          : <h4>No Matchups Yet</h4>
      }
    </>
  )
}

export default MatchupsTable