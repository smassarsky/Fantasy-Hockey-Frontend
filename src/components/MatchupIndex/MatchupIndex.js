import React, { useReducer, useEffect, useState } from 'react'

import { baseUrl } from 'config'
import { matchupsReducer } from 'reducers'
import { matchupsConstants } from 'reduxConstants'

import { MatchupsHeader, MatchupsTable } from './components'
import { NewModal, EditModal, DestroyModal } from './modals'

import { AlertMessage } from 'components/common'

import { handleResponse } from 'helpers'

export const matchupsInitialState = {
  matchups: [],
  teams: [],
  initialFetch: false,
  fetching: false
}

const serverMessageInitialState = { type: null, message: null }

const MatchupIndex = props => {

  const [ matchupStore, dispatch ] = useReducer(matchupsReducer, matchupsInitialState)
  const [ serverMessage, setServerMessage ] = useState(serverMessageInitialState)

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
        dispatch({ type: matchupsConstants.CREATE_SUCCESS, json })
      })
  }

  useEffect(() => {
    dispatch({ type: matchupsConstants.INDEX_REQUEST })
    fetch(`${baseUrl}/matchups`, { credentials: 'include' })
      .then(handleResponse)
      .then(json => {
        console.log('json resp', json)
        dispatch({ type: matchupsConstants.INDEX_SUCCESS, json })
      })
      .catch(({ error, status }) => {
        console.log('hi from catch', error, status)
        if (status !== 401) {
          setServerMessage({ type: 'failure', message: error.message || error })
        }
      })
  }, [])

  console.log('matchupStore', matchupStore)

  return (
    <div>
      <MatchupsHeader
        showCreate={showNew}
        showJoin={null}
      />
      <AlertMessage
        type={serverMessage.type}
        message={serverMessage.message}
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