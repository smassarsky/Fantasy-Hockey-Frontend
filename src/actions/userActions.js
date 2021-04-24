import { userConstants } from 'reduxConstants'
import { alertActions } from './alertActions'
import { userService } from 'services'
import { history } from 'helpers/history'

export const userActions = {
  signup,
  login,
  logout,
  dashboard
}

function signup(fields) {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    userService.signup(fields)
      .then(
        user => {
          dispatch(success(user))
          localStorage.setItem('user', JSON.stringify(user))
          history.push('/dashboard')
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: userConstants.SIGNUP_REQUEST  } }
  function success(user) { return { type: userConstants.SIGNUP_SUCCESS, user } }
  function failure() { return { type: userConstants.SIGNUP_FAILURE } }
}

function login(username, password) {
  console.log(username, password)
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    userService.login(username, password)
      .then(
        user => {
          dispatch(success(user.data))
          localStorage.setItem('user', JSON.stringify(user.data))
          history.push('dashboard')
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: userConstants.LOGIN_REQUEST } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure() { return { type: userConstants.LOGIN_FAILURE } }
}

function logout() {
  return dispatch => {
    dispatch({ type: userConstants.LOGOUT })
    userService.logout()
      .then(
        () => {
          localStorage.removeItem('user')
          history.push('/')
        },
        error => {
          dispatch(alertActions.error(error))
        }
      )
  }
}


function dashboard() {
  return dispatch => {
    dispatch(request())
    dispatch(alertActions.clear())

    userService.dashboard()
      .then(
        resp => {
          dispatch(success(resp))
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: userConstants.DASHBOARD_REQUEST } }
  function success(resp) { return { type: userConstants.DASHBOARD_SUCCESS, resp } }
  function failure() { return { type: userConstants.DASHBOARD_FAILURE } }
}