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
          history.pushState('/dashboard')
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
          console.log('success')
          dispatch(success(user))
          localStorage.setItem('user', JSON.stringify(user))
          history.push('dashboard')
        },
        error => {
          console.log('failure')
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

}

function dashboard() {
  
}