export function handleResponse(response) {
  return response.json().then(json => {
    if (!response.ok || response.status !== 200) {
      const error = json.error || response.statusText
      return Promise.reject(error)
    }
    return json
  })
}