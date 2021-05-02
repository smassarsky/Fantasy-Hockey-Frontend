export const validateMatchup = data => {
  let errors = {}
  const fields = [
    'name',
    'teamId',
    'startDate',
    'endDate'
  ]

  fields.forEach(field => {
    if(data[field] === '') {
      errors[field] = "Can't be blank."
    }
  })

  if (!errors.startDate && ! errors.endDate) {
    if (new Date(data.startDate) >= new Date(data.endDate)) {
      errors.startDate = "Must be before end date."
      errors.endDate = "Must be after start date."
    }
  }

  return errors
}