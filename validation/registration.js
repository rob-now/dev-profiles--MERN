const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateRegisterInput(data) {
  const errors = {}

  // If name is empty use empty string
  // This is necessary for the Validator which validates strings only
  data.name = !isEmpty(data.name)
    ? data.name
    : ''

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters.'
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required.'
  }

  return {
    errors,
    isValid: isEmpty(errors), // true if no errors
  }
}
