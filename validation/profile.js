const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateProfileInput(data) {
  const errors = {}

  // Validating fields that are required in our Profile Model
  data.handle = !isEmpty(data.handle) ? data.handle : ''
  data.status = !isEmpty(data.status) ? data.status : ''
  data.skills = !isEmpty(data.skills) ? data.skills : ''

  if (!Validator.isLength(data.handle, { min: 2, max: 32 })) {
    errors.handle = 'Handle should be between 2 and 32 characters'
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle is required'
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status is required'
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills is required'
  }

  return {
    errors,
    isValid: isEmpty(errors), // true if no errors
  }
}
