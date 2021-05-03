import { history } from 'helpers'

export function handleResponse(response) {
  console.log('hi from handlresponse', response.ok, response.status)
  return response.json().then(json => {
    if (!response.ok || response.status !== 200) {
      if (response.status === 401) {
        history.push('/login')
        return Promise.reject({ status: response.status })
      }
      const error = json.error || response.statusText
      console.log(error, json.error, response.statusText)
      return Promise.reject({ error })
    }
    return json
  })
}