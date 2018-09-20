import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import Spinner from '../common/Spinner'
import ProfileActions from './ProfileActions'
import Experience from './Experience'
import Education from './Education'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  handleDeleteAccount = () => {
    this.props.deleteAccount()
  }

  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile

    let dashboardContent

    if (profile === null || loading) {
      dashboardContent = <Spinner />
      // Check if user has profile
    } else if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">
            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
          </p>
          <ProfileActions />
          {profile.experience.length > 0 && <Experience experience={profile.experience} />}
          {profile.education.length > 0 && <Education education={profile.education} />}
          <div style={{ marginBottom: '60px' }} />
          <button type="button" className="btn btn-danger" onClick={this.handleDeleteAccount}>
            Delete account
          </button>
        </div>
      )
    } else {
      // User has no profile
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have no profile. You can add it.</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create profile
          </Link>
        </div>
      )
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount },
)(Dashboard)
