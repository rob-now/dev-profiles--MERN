
const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validatePostInput(data) {
  const errors = {}

  data.text = !isEmpty(data.text) ? data.text : ''

  if (!Validator.isLength(data.text, { min: 10, max: 350 })) {
    errors.text = 'Text should be between 10 and 350 characters'
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text is required'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
