const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateCommentInput(data) {
  const errors = {}

  data.text = !isEmpty(data.text) ? data.text : ''

  if (!Validator.isLength(data.text, { min: 5, max: 250 })) {
    errors.text = 'Text should be between 5 and 250 characters'
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text is required'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
