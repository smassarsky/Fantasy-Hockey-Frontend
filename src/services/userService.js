import { handleResponse } from 'services'
import { baseUrl } from 'config'

export const userService = {
  signup,
  login,
  logout,
  dashboard
}

function signup({ username, name, email, password, passwordConfirmation }) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      user: { username, name, email, password, passwordConfirmation }
    })
  }

  return fetch(`${baseUrl}/signup`, options)
    .then(handleResponse)
}

function login(username, password) {
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ username, password })
  }

  return fetch(`${baseUrl}/login`, options)
    .then(handleResponse)
}

function logout() {

}

function dashboard() {
  
}