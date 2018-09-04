import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = () => <div />

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
