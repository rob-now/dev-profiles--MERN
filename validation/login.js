const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateLoginInput(data) {
  const errors = {}

  // If name, email, password is empty, use empty string instead
  // This is necessary for the Validator which validates strings only
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid.'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required.'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required.'
  }

  return {
    errors,
    isValid: isEmpty(errors), // true if no errors
  }
}
