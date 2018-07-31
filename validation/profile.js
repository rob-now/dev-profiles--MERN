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

  // Validating fields with URLs
  // First check if the field is not empty with our function
  if (!isEmpty(data.website)) {
    // Then check if it's valid URL with Validator
    if (!Validator.isURL(data.website)) {
      errors.website = 'This is not valid URL'
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'This is not valid URL'
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'This is not valid URL'
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'This is not valid URL'
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'This is not valid URL'
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'This is not valid URL'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors), // true if no errors
  }
}
