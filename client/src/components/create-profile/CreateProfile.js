import React, { Component } from 'react'
import { connect } from 'react-redux'

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    githubusername: '',
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    errors: {},
  }

  render() {
    return <div />
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
})

export default connect(null)(CreateProfile)
