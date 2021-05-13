import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Loading } from 'components/common'
import { PreDraftPage } from './PreDraftPage'
import { baseUrl } from 'config'
import { handleResponse } from 'helpers'

const userId = parseInt(localStorage.getItem('user').id)

const MatchupShow = props => {

  let { matchupId } = useParams()

  useEffect(() => {
    fetch(`${baseUrl}/matchups/${matchupId}`, { credentials: 'include' })
      .then(handleResponse)
      .then(json => {
        
      },
      error => {

      })
  }, [])

  console.log('hi from show, matchup ID:', matchupId)
  return (
    <Loading />
  )
}

export default MatchupShow