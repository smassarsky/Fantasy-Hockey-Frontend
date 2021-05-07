import React, { useReducer, useEffect, useState } from 'react'

import { baseUrl } from 'config'
import { matchupsReducer } from 'reducers'
import { matchupsConstants } from 'reduxConstants'

import { MatchupsHeader, MatchupsTable } from './components'
import { NewModal, DestroyModal } from './modals'

import { AlertMessage } from 'components/common'

import { handleResponse } from 'helpers'

import { EditModal } from './modals/MatchupForm'

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
  const setError = error => {
    setServerMessage({ type: 'failure', message: error.message || error })
  }
  const setSuccess = success => {
    setServerMessage({ type: 'success', message: success.message || success })
  }

  const [ newModal, setShowNew ] = useState(false)
  const showNew = () => setShowNew(true)
  const hideNew = () => setShowNew(false)

  const [ editModal, setEditModal ] = useState({ show: false, matchup: null })
  const showEdit = matchup => setEditModal({ show: true, matchup })
  const hideEdit = () => setEditModal({ show: false, matchup: null })

  const clearMessages = () => setServerMessage(serverMessageInitialState)

  const create = fields => {
    dispatch({ type: matchupsConstants.CREATE_REQUEST })
    clearMessages()
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

  const update = fields => {
    dispatch({ type: matchupsConstants.UPDATE_REQUEST })
    clearMessages()
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({ matchup: { id: editModal.matchup.id, fields }})
    }
    fetch(`${baseUrl}/matchups/${fields.id}`, options)
      .then(resp => resp.json())
      .then(json => {
        dispatch({ type: matchupsConstants.UPDATE_SUCCESS, json })
      },
      error => {
        dispatch({ type: matchupsConstants.UPDATE_FAILURE })
        setError(error)
      })
  }

  useEffect(() => {
    dispatch({ type: matchupsConstants.INDEX_REQUEST })
    clearMessages()
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
        showEdit={showEdit}
      />

    <NewModal
      show={newModal}
      hide={hideNew}
      teams={matchupStore.teams}
      create={create}
    />

    <EditModal
      show={editModal.show}
      hide={hideEdit}
      teams={matchupStore.teams}
      submitAction={update}
      matchup={editModal.matchup}
    />


    </div>
  )
}

export default MatchupIndex