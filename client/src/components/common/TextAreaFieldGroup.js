import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const TextAreaFieldGroup = ({
  placeholder, name, value, onChange, error, info,
}) => (
  <div className="form-group">
    <textarea
      className={classnames('form-control form-control-lg', {
        'is-invalid': error,
      })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    {error && <div className="invalid-feedback">{error}</div>}
    {info && <small className="form-text text-muted">{info}</small>}
  </div>
)

TextAreaFieldGroup.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
}

export default TextAreaFieldGroup
