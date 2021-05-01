import React, { useReducer, useEffect } from 'react'

import { baseUrl } from 'config'
import { matchupsReducer } from 'reducers'
import { matchupsConstants } from 'reduxConstants'

import { MatchupsHeader, MatchupsTable } from './components'
import { CreateModal, EditModal, DestroyModal } from './modals'

export const matchupsInitialState = {
  matchups: [],
  initialFetch: false,
  error: ''
}

const MatchupIndex = props => {

  const [ matchupStore, dispatch ] = useReducer(matchupsReducer, matchupsInitialState)

  useEffect(() => {
    dispatch({ type: matchupsConstants.INDEX_REQUEST })
    fetch(`${baseUrl}/matchups`, { credentials: 'include' })
      .then(resp => resp.json())
      .then(json => {
        dispatch({ type: matchupsConstants.INDEX_SUCCESS, matchups: json.data })
      })
  }, [])

  return (
    <div>
      <MatchupsHeader />
      <MatchupsTable 
        matchups={matchupStore.matchups}
      />
    </div>
  )
}

export default MatchupIndex