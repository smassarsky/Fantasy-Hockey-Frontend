import React from 'react'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import { LinkContainer } from 'react-router-bootstrap'

import { dateFormatter } from 'helpers'

const userId = parseInt(JSON.parse(localStorage.getItem('user')).id)

const MatchupsTable = props => {
  return (
    props.matchups.length > 0
      ? <FullTable {...props} />
      : <h4>No Matchups Yet</h4>
  )
}

const FullTable = ({ matchups, showEdit, showDestroy }) => {
  return (
    <Table>
      <TableHeader />
      <tbody>
        {matchups.map(matchup => {
          return <TableRow
            key={matchup.id}
            matchup={matchup}
            showEdit={showEdit}
            showDestroy={showDestroy}
          />
        })}
      </tbody>
    </Table>
  )
}

const TableHeader = () => {
  return (
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
  )
}

const TableRow = props => {
    const { id, attributes: { name, team, owner, startDate, endDate, status } } = props.matchup
    return (
      <tr>
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

          { owner.id === userId
          ? <OwnerButtons {...props} />
          : null }

        </td>
      </tr>
  )
}

const OwnerButtons = ({ matchup, showEdit, showDestroy }) => {
  return (
    <>
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
    </>
  )
}

export default MatchupsTable