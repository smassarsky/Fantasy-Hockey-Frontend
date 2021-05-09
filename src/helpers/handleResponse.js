import { history } from 'helpers'

export function handleResponse(response) {
  console.log('hi from handlresponse', response.ok, response.status)
  return response.json().then(json => {
    if (!response.ok || response.status !== 200) {
      if (response.status === 401) {
        history.push('/login')
        return Promise.reject({ status: response.status })
      }
      const message = json.message || response.statusText
      console.log(json)
      return Promise.reject({ message, fields: json.fields })
    }
    return json
  })
}
