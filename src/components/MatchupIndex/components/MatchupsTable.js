import React from 'react'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import { LinkContainer } from 'react-router-bootstrap'

import { dateFormatter } from 'helpers'

const MatchupsTable = ({ matchups, showEdit, showDestroy }) => {

  const userId = JSON.parse(localStorage.getItem('user')).id

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
            const { id, attributes: { name, team, owner, startDate, endDate, status } } = matchup
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{team.name}</td>
                <td>{owner.name}</td>
                <td>{dateFormatter.toDate(startDate)}</td>
                <td>{dateFormatter.toDate(endDate)}</td>
                <td>{status}</td>
                <td>
                  <LinkContainer to={`/matchups/${id}`} >
                    <Button
                      className="mx-2"
                      variant="primary"
                      size="sm"
                    >
                      Show
                    </Button>
                  </LinkContainer>


                  <Button
                    className="mx-2"
                    variant="success"
                    size="sm"
                    onClick={() => showEdit(matchup)}
                  >
                    Edit
                  </Button>

                  <Button
                    className="mx-2"
                    variant="danger"
                    size="sm"
                    onClick={() => showDestroy(matchup)}
                  >
                    Delete
                  </Button>

                </td>
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