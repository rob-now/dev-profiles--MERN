import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'

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

  onSubmit = (event) => {
    event.preventDefault()
    console.log('Form submitted')
  }

  onChange = event => this.setState({
    [event.target.name]: event.target.value,
  })

  render() {
    const { errors } = this.state

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create profile</h1>
              <p className="lead text-center">Fill out the form to create your profile.</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL (nickname)"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.protoTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
})

export default connect(mapStateToProps)(CreateProfile)
