export const dateFormatter = {
  toDate,
  toDateInputStr
}

function toDate(dateStr) {
  const date = new Date(dateStr)
  date.setDate(date.getDate() + 1)
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }
  return date.toLocaleDateString(undefined, options)
}

function toDateInputStr(serverStr) {
  return serverStr.split('T')[0]
}