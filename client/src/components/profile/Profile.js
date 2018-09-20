import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getProfileByHandle } from '../../actions/profileActions'
import ProfileHeader from './ProfileHeader'
import ProfileAbout from './ProfileAbout'
import ProfileCredentials from './ProfileCredentials'
import ProfileGitHub from './ProfileGitHub'

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle)
    }
  }

  render() {
    return (
      <div>
        <ProfileHeader />
        <ProfileAbout />
        <ProfileCredentials />
        <ProfileGitHub />
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
})

export default connect(
  mapStateToProps,
  { getProfileByHandle },
)(Profile)
