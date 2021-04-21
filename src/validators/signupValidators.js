export const validateSignup = data => {
  let errors = {}
  const fields = [
    'username',
    'email',
    'name',
    'password',
    'passwordConfirmation'
  ]
  fields.forEach(field => {
    if (data[field] === '') {
      errors[field] = "Can't be blank."
    }
  })

  if (data.password !== data.passwordConfirmation) {
    errors.password = errors.password ? errors.password + " Passwords must match." : "Passwords must match."
  }

  return errors
}