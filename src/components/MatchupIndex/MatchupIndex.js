import React, { useReducer, useEffect, useState } from 'react'

import { baseUrl } from 'config'
import { matchupsReducer } from 'reducers'
import { matchupsConstants } from 'reduxConstants'

import { MatchupsHeader, MatchupsTable } from './components'
import { NewModal, EditModal, DestroyModal } from './modals'

export const matchupsInitialState = {
  matchups: [],
  teams: [],
  initialFetch: false,
  fetching: false,
  error: ''
}

const MatchupIndex = props => {

  const [ matchupStore, dispatch ] = useReducer(matchupsReducer, matchupsInitialState)

  const [ newModal, setShowNew ] = useState(false)
  const showNew = () => setShowNew(true)
  const hideNew = () => setShowNew(false)

  const create = fields => {
    dispatch({ type: matchupsConstants.CREATE_REQUEST })
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({ matchup: fields })
    }
    fetch(`${baseUrl}/matchups`, options)
      .then(resp => resp.json())
      .then(json => {
        console.log(json)
      })
  }

  useEffect(() => {
    dispatch({ type: matchupsConstants.INDEX_REQUEST })
    fetch(`${baseUrl}/matchups`, { credentials: 'include' })
      .then(resp => resp.json())
      .then(json => {
        console.log(json)
        dispatch({ type: matchupsConstants.INDEX_SUCCESS, json })
      })
  }, [])

  return (
    <div>
      <MatchupsHeader
        showCreate={showNew}
        showJoin={null}
      />
      <MatchupsTable 
        matchups={matchupStore.matchups}
      />

    <NewModal
      show={newModal}
      hide={hideNew}
      teams={matchupStore.teams}
      create={create}
    />


    </div>
  )
}

export default MatchupIndex