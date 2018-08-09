import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
// Connecting redux with component which is called container (React component + Redux)
import { connect } from 'react-redux'
import classnames from 'classnames'
import { registerUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.errors) {
  //     return { errors: nextProps.errors }
  //   }
  // }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    }

    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const { errors } = this.state

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  // We don't need type="text" because we defined
                  // default type as text in TextFieldGroup.js
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Confirm password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.handleChange}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

// Map Redux state to props that cen be read by React component
const mapStateToProps = state => ({
  // state.auth comes from Redux state defined in rootReducer
  auth: state.auth,
  errors: state.errors,
})

export default connect(
  mapStateToProps,
  { registerUser },
)(withRouter(Register))
