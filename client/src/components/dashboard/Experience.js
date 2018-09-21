import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import { deleteExperience } from '../../actions/profileActions'

class Experience extends Component {
  handleDeleteExperience = (expId) => {
    this.props.deleteExperience(expId)
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY-MM-DD">{exp.from}</Moment> -{' '}
          {exp.to === null ? 'Now' : <Moment format="YYYY-MM-DD">{exp.to}</Moment>}
        </td>
        <td>
          <button
            onClick={() => this.handleDeleteExperience(exp._id)}
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
        <h4 className="mb-4">Experience</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    )
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
}

export default connect(
  null,
  { deleteExperience },
)(Experience)