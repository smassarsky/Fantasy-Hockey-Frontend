import { alertConstants } from '../constants/alertConstants'

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'text-success',
        message: action.message
      }
    case alertConstants.ERROR:
      return {
        type: 'text-danger',
        message: action.message
      }
    case alertConstants.CLEAR:
      return {}
    default:
      return state
  }
}