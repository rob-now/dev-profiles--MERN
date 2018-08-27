import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profileActions'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile

    let dashboardContent

    if (profile === null || loading) {
      dashboardContent = <h3>Loading content...</h3>
    } else {
      dashboardContent = <h3>Dashboard content</h3>
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

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(
  mapStateToProps,
  { getCurrentProfile },
)(Dashboard)
