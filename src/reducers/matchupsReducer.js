import { matchupsConstants } from 'reduxConstants'
import { matchupsInitialState } from 'components/MatchupIndex'

export function matchupsReducer(state, action) {
  switch(action.type) {
    case matchupsConstants.INDEX_REQUEST:
      return {
        ...state,
        initialFetch: true
      }
    case matchupsConstants.INDEX_SUCCESS:
      return {
        matchups: action.matchups,
        initialFetch: false,
        error: ''
      }
    case matchupsConstants.INDEX_FAILURE:
      return matchupsInitialState




      
    default:
      return state
  }
}