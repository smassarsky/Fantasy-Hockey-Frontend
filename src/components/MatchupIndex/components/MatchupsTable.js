import React from 'react'

import Table from 'react-bootstrap/Table'

const MatchupsTable = ({ matchups }) => {

  const renderTable = () => {
    return (
      <Table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>Owner</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {matchups.map(matchup => {
            const { name, team, owner, startDate, endDate, status } = matchup.attributes
            return (
              <tr>
                <td>{name}</td>
                <td>{team}</td>
                <td>{owner}</td>
                <td>{startDate}</td>
                <td>{endDate}</td>
                <td>{status}</td>
                <td>Actions TODO</td>
              </tr>
            )
          })}           
        </tbody>
       
      </Table>

    )
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