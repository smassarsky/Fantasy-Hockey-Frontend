import { matchupsConstants } from 'reduxConstants'
import { matchupsInitialState } from 'components/MatchupIndex'

export function matchupsReducer(state, action) {
  switch(action.type) {
    case matchupsConstants.INDEX_REQUEST:
      return {
        ...state,
        initialFetch: true,
        fetching: true
      }
    case matchupsConstants.INDEX_SUCCESS:
      return {
        matchups: action.json.matchups.data,
        teams: action.json.teams.data,
        initialFetch: false,
        fetching: false,
        error: ''
      }
    case matchupsConstants.INDEX_FAILURE:
      return matchupsInitialState

    case matchupsConstants.CREATE_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case matchupsConstants.CREATE_SUCCESS:
      return {
        ...state,
        fetching: false,
        matchups: [...state.matchups, action.matchup]
      }
    case matchupsConstants.CREATE_FAILURE:
      return {
        ...state,
        fetching: false
      }

    case matchupsConstants.UPDATE_REQUEST:
      return {
        ...state,
        fetching: true
      }

    case matchupsConstants.UPDATE_SUCCESS:
      return {
        ...state,
        fetching: false,
        matchups: state.matchups.map(matchup => matchup.id === action.matchup.id ? action.matchup : matchup)
      }
    case matchupsConstants.UPDATE_FAILURE:
      return {
        ...state,
        fetching: false
      }

    case matchupsConstants.DESTROY_REQUEST:
      return {
        ...state,
        fetching: true
      }

    case matchupsConstants.DESTROY_SUCCESS:
      return {
        ...state,
        fetching: false,
        matchups: state.matchups.filter(matchup => matchup.id !== action.matchupId)
      }
    case matchupsConstants.DESTROY_FAILURE:
      return {
        ...state,
        fetching: false
      }
      
    default:
      return state
  }
}