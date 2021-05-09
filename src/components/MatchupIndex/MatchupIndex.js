import React, { useReducer, useEffect, useState } from 'react'

import { baseUrl } from 'config'
import { matchupsReducer } from 'reducers'
import { matchupsConstants } from 'reduxConstants'

import { MatchupsHeader, MatchupsTable } from './components'
import { DestroyModal } from './modals'

import { AlertMessage } from 'components/common'

import { handleResponse } from 'helpers'

import { NewModal, EditModal } from './modals/MatchupForm'

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
    console.log(error)
    setServerMessage({ type: 'failure', message: error.message || error })
  }
  const setSuccess = success => {
    setServerMessage({ type: 'success', message: success.message || success })
  }

  const [ newModal, setShowNew ] = useState(false)
  const showNew = () => setShowNew(true)
  const hideNew = () => {
    setShowNew(false)
    clearFormErrors()
  }

  const [ editModal, setEditModal ] = useState({ show: false, matchup: null })
  const showEdit = matchup => setEditModal({ show: true, matchup })
  const hideEdit = () => {
    setEditModal({ show: false, matchup: null })
    clearFormErrors()
  }

  const [ destroyModal, setDestroyModal ] = useState({ show: false, matchup: null })
  const showDestroy = matchup => setDestroyModal({ show: true, matchup })
  const hideDestroy = () => setDestroyModal({ show: false, matchup: null })

  const [ formErrors, setFormErrors ] = useState({})
  const setEditErrors = errors => setFormErrors({ edit: errors })
  const setNewErrors = errors => setFormErrors({ new: errors })
  const clearFormErrors = () => setFormErrors({})

  const clearMessages = () => {
    setServerMessage(serverMessageInitialState)
    clearFormErrors()
  }

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
      .then(handleResponse)
      .then(json => {
        dispatch({ type: matchupsConstants.CREATE_SUCCESS, json })
        setSuccess("Matchup Created")
        hideNew()
      },
      error => {
        dispatch({ type: matchupsConstants.CREATE_FAILURE })
        if (error.fields) {
          setNewErrors(error.fields)
        }
        setError(error.message)
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
      body: JSON.stringify({ matchup: { id: editModal.matchup.id, ...fields }})
    }
    fetch(`${baseUrl}/matchups/${editModal.matchup.id}`, options)
      .then(handleResponse)
      .then(json => {
        dispatch({ type: matchupsConstants.UPDATE_SUCCESS, matchup: json.data })
        hideEdit()
      },
      error => {
        if (error.status !== 401) {
          dispatch({ type: matchupsConstants.UPDATE_FAILURE })
          if (error.fields) {
            setEditErrors(error.fields)
          }
          setError(error.message)
        }
      })
  }

  const destroy = matchupId => {
    dispatch({ type: matchupsConstants.DESTROY_REQUEST})
    clearMessages()
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      credentials: "include"
    }
    fetch(`${baseUrl}/matchups/${matchupId}`, options)
      .then(handleResponse)
      .then(json => {
        dispatch({ type: matchupsConstants.DESTROY_SUCCESS, matchupId })
        hideDestroy()
      },
      error => {
        if (error.status !== 401) {
          dispatch({ type: matchupsConstants.DESTROY_FAILURE })
          hideDestroy()
        }
      })
  }

  useEffect(() => {
    dispatch({ type: matchupsConstants.INDEX_REQUEST })
    clearMessages()
    fetch(`${baseUrl}/matchups`, { credentials: 'include' })
      .then(handleResponse)
      .then(json => {
        dispatch({ type: matchupsConstants.INDEX_SUCCESS, json })
      },
      error => {
        if (error.status !== 401) {
          dispatch({ type: matchupsConstants.INDEX_FAILURE })
          setError(error.message)
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
        showDestroy={showDestroy}
      />

      <NewModal
        show={newModal}
        hide={hideNew}
        teams={matchupStore.teams}
        submitAction={create}
        errors={formErrors.new}
      />

      <EditModal
        show={editModal.show}
        hide={hideEdit}
        teams={matchupStore.teams}
        submitAction={update}
        matchup={editModal.matchup}
        errors={formErrors.edit}
      />

      <DestroyModal
        show={destroyModal.show}
        hide={hideDestroy}
        matchup={destroyModal.matchup}
        destroy={destroy}
      />

    </div>
  )
}

export default MatchupIndex