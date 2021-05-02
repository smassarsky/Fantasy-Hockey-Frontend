import React from 'react'

import Button from 'react-bootstrap/Button'

const MatchupsHeader = ({ showCreate, showJoin }) => {
  return (
    <div className="my-3">
      <h2>Matchups</h2>
      <div>
        <Button
          variant="primary"
          type="button"
          size="sm"
          className="mx-2"
          onClick={showCreate}
        >
          Create a Matchup
        </Button>
        <Button
          variant="primary"
          type="button"
          size="sm"
          className="mx-2"
        >
          Join a Matchup
        </Button>
      </div>
    </div>
  )
}

export default MatchupsHeader