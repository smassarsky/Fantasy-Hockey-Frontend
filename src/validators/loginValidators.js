export const validateLogin = data => {
  let errors = {}
  const fields = ['username','password']
  fields.forEach(field => {
    if (data[field] === '') {
      errors[field] = "Can't be blank."
    }
  })
  return errors
}