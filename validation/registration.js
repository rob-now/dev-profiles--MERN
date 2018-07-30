const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateRegisterInput(data) {
  const errors = {}

  // If name, email, password is empty, use empty string instead
  // This is necessary for the Validator which validates strings only
  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters.'
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required.'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required.'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid.'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required.'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 32 })) {
    errors.password = 'Password must be between 6 and 32 characters.'
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password is required.'
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must be the same.'
  }

  return {
    errors,
    isValid: isEmpty(errors), // true if no errors
  }
}
