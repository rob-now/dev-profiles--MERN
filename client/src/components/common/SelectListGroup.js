import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const SelectListGroup = ({
  name, value, onChange, error, info, options,
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ))

  return (
    <div className="form-group">
      <select
        className={classnames('form-control form-control-lg', {
          'is-invalid': error,
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  )
}

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  options: PropTypes.array.isRequired,
}

export default SelectListGroup
