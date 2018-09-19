import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import { deleteEducation } from '../../actions/profileActions'

class Education extends Component {
  handleDeleteEducation = (eduId) => {
    this.props.deleteEducation(eduId)
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY-MM-DD">{edu.from}</Moment> -{' '}
          {edu.to === null ? 'Now' : <Moment format="YYYY-MM-DD">{edu.to}</Moment>}
        </td>
        <td>
          <button
            onClick={() => this.handleDeleteEducation(edu._id)}
            type="button"
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ))
    return (
      <div>
        <h4 className="mb-4">Education</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    )
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
}

export default connect(
  null,
  { deleteEducation },
)(Education)
